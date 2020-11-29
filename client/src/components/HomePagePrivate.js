import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DashboardBar from '../components/common/DashboardBar';
import Chart from './common/ChartView';
import Table from './common/TableView';
import transformUserData from './common/transformData';

const HomePagePrivate = ({ user }) => {
    const [active, setActive] = useState('progress');

    useEffect(() => {
      if (user === undefined) {
        // make get request
      }
    }, [user])
    return (
        <>
        <Container fluid>
          <Row>
            <Col id="sidebarMenu" className="col-md-2 d-md-block bg-light sidebar">
              <DashboardBar active={active} setActive={setActive} />
            </Col>
            {active === 'progress' ? 
            <Col className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                  <h1 className="h2">Progress</h1>
                </div>
                <Chart weights={transformUserData(user.weights)}/>
            </Col>: null}
            {active === 'history' ?
            <Col className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">History</h1>
              </div>
              <Table />
            </Col>: null}            
            </Row>
          </Container>
        </>
    )
}

export default HomePagePrivate;