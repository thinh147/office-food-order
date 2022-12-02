package com.gogitek.orderecommerce.service.message.email;

import com.gogitek.orderecommerce.config.util.EmailModel;
import lombok.AllArgsConstructor;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.task.TaskExecutor;
import org.springframework.mail.MailParseException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.util.Arrays;
import java.util.Objects;

@Service
public class MailService {
    private final Logger LOGGER = LogManager.getLogger(MailService.class);

    private JavaMailSender mailSender;

    @Value("${email.sender}")
    private String sender;
    @Value("${email.success}")
    private String successContent;
    @Value("${email.fail}")
    private String failContent;

    private TaskExecutor taskExecutor;

    public MailService(JavaMailSender mailSender, TaskExecutor taskExecutor) {
        this.mailSender = mailSender;
        this.taskExecutor = taskExecutor;
    }

    public void sendMail(final String text, final String from, final String to, final String subject, final File file) throws Exception {
        taskExecutor.execute(() -> {
            try {
                sendMailSimple(text, from, to, subject, file.getAbsolutePath());
            } catch (Exception e) {
                e.printStackTrace();
                LOGGER.error("Failed to send email to: " + to + " reason: " + e.getMessage());
            }
        });
    }

    private void sendMailSimple(String text, String from, String to, String subject, String filePath) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text);
            if (filePath != null) {
                FileSystemResource file = new FileSystemResource(filePath);
                helper.addAttachment(Objects.requireNonNull(file.getFilename()), file);
            }
        } catch (MessagingException e) {
            throw new MailParseException(e);
        }
        mailSender.send(message);

        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("Mail was sent successfully to: " + to + " with file: " + filePath);
        }
    }

    private MimeMessage createEmail(String receiver, String content, String subject, boolean isHtml, String... ccEr){
        MimeMessage message = this.mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try{
            helper.setFrom(sender);
            helper.setTo(InternetAddress.parse(receiver));
            if(ccEr != null){
                helper.setCc(InternetAddress.parse(Arrays.toString(ccEr)));
            }
            helper.setText(content, isHtml);
            helper.setSubject(subject);
        }catch (Exception e){
            LOGGER.error(failContent);
            return null;
        }
        return message;
    }

    public Boolean sendEmail(MimeMessage mimeMessage){
        try{
            mailSender.send(mimeMessage);
            LOGGER.info(this.getClass() + successContent);
            return true;
        }catch (Exception e){
            LOGGER.error(e);
            return false;
        }
    }

    @Async
    public void sendEmail(EmailModel email, Boolean isHtml){
        MimeMessage message = createEmail(email.getTo(), email.getContent(), email.getSubject(), isHtml, email.getCc());
        try{
            sendEmail(message);
        }catch (Exception e){
            LOGGER.error(e.getMessage());
        }
    }
}
