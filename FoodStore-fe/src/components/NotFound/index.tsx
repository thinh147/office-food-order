import { Button, Empty } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

const NotFound = () => {
  return (
    <div className='center-div'>
      <Empty description="Page not found" />
      Go to <Button type='primary'>
        <Link to={'/'}>homepage </Link>
      </Button>
    </div>
  )
}

export default NotFound