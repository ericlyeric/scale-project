import React from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';

const TableView = ({ data }) => {
    return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
          {data.length > 0 ? data.map((elem, index) => {
            return (
              <tr>
                <th>{index}</th>
                <th>{moment(elem.date).format('MMMM Do YYYY, h:mm a')}</th>
                <th>{elem.weight}</th>
              </tr>
            )
          }): null}
          </tbody>
        </Table>
    )
}

export default TableView;