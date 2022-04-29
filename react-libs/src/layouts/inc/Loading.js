import React from 'react'
import { Link } from 'react-router-dom'
import { Spinner } from './Spinner'

export const Loading = () => {
    return (
        <div className="card">
            <div className="card-body text-center">
                <h4 className='py-3'>Đang phát triển.....</h4>
                <Spinner />
                <p>
                    <Link to={`/`}> Trang chủ</Link>

                </p>
            </div>
        </div>

    )
}
