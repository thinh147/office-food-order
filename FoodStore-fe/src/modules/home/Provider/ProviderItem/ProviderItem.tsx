import { Col } from "antd";
import style from './index.module.scss';

interface ProviderItem {
    name: string;
    img_src: string;
    describe: string;
    link: string;
}


const ProviderItem = ({ name, img_src, describe, link }: ProviderItem) => {
    console.log("ngu");
    return (
        <Col className="gutter-row" xs={24} xl={6}>
            <div className={style["item-provider"]}>
                <a href={link} target="_blank" rel="noreferrer">
                    <img src={img_src} alt="" />
                </a>

                <h5 className={style["name-provider"]}>{name}</h5>
                <p className={style["describe-provider"]}>{describe}</p>
            </div>
        </Col>
    );
};

export default ProviderItem
