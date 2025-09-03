import React from "react";
import { Row, Col, Pagination, Table, Button } from "react-bootstrap";
function PagingNation() {
  return (
    <div>
      <Row>
        <Col lg={6} md={6} sm={12}>
          <div className="tech-staff-perviose">
            <div>Showing 1 to  entries</div>
          </div>
        </Col>
        <Col lg={6} md={6} sm={12}>
          <div className="tech-staff-table">
            <Pagination className="sector-paging">
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default PagingNation;
