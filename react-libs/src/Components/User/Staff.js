import React from 'react'
import { EmptyData } from '../../layouts/inc/EmptyData'
import { Spinner } from '../../layouts/inc/Spinner'

export const Staff = () => {
    return (
        <div className="card-body">
            <div>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Manage</th>
                        </tr>
                    </tfoot>
                    <tbody>
                        {/* {loading === true && (<tr><td><Spinner /></td></tr>)}
                    {data.length > 0 ? data : <tr><td><EmptyData /></td></tr>} */}
                        <tr>
                            <td> <p className='text-center'> Đang phát triển phần quản lý nhân viên </p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
