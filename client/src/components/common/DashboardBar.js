import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { BarChart2, List } from 'react-feather';
import '../../styles/Dashboard.css';

const DashboardBar = () => {
    return(
        <Nav id="sidebarMenu" className="col-md-2 d-md-block bg-light sidebar">
        <div className="sidebar-sticky pt-2 nav flex-column">
          <Nav.Item>
              <Button type="button" className="btn btn-light active" block>
                <BarChart2 size={18}/>
                <span>Progress</span>
              </Button>
          </Nav.Item>
          <Nav.Item>
              <Button type="button" className="btn btn-light" block>
                <List size={18}/>
                <span>Weight History</span>
              </Button>
          </Nav.Item>
        </div>
      </Nav>
    );
}

export default DashboardBar;