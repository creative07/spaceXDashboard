import React, { Fragment } from "react";
import { connect } from "react-redux";
import { allLaunchesActions } from "../../_actions/all-launches.action";
import ImageGrid from "../Loader/loader";
import "./styles.css";
import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Navbar,
  NavbarBrand,
  Collapse,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { upcomingLaunchesActions } from "../../_actions/upcoming_launches.action";
import { pastLaunchesActions } from "../../_actions/past_launches.action";

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      currentPage: 1,
      show: false,
      selectedvalue: {},
      launchdata: {},
      isOpen: false,
      startdate: "",
      enddate: "",
      showLoader: false,
    };
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleUpcomingLaunches = this.handleUpcomingLaunches.bind(this);
    this.handlePastLaunches = this.handlePastLaunches.bind(this);
    this.handleAllLaunches = this.handleAllLaunches.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleUnsuccess = this.handleUnsuccess.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.all_launches_Details !== this.props.all_launches_Details) {
      this.setState({
        launchdata: nextProps.all_launches_Details,
      });
    }
    if (nextProps.past_launches_reducer !== this.props.past_launches_reducer) {
      this.setState({
        launchdata: nextProps.past_launches_reducer,
      });
    }

    if (
      nextProps.upcoming_launches_reducer !==
      this.props.upcoming_launches_reducer
    ) {
      this.setState({
        launchdata: nextProps.upcoming_launches_reducer,
      });
    }
  }

  componentDidMount() {
    this.props.all_launches();
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  handlePrevClick() {
    let currentPage = this.state.currentPage;
    currentPage -= 1;
    this.setState({ currentPage });
  }

  handleNextClick() {
    let currentPage = this.state.currentPage;
    currentPage += 1;
    this.setState({ currentPage });
  }

  showModal(item) {
    this.setState({ selectedValue: item, show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

  handleUpcomingLaunches() {
    this.props.upcoming_launches_action();
    this.setState({
      currentPage: 1,
    });
  }

  handlePastLaunches() {
    this.setState({
      showLoader: true,
    });
    this.props.past_launches_action();
    this.setState({
      currentPage: 1,
    });
    this.setState({
      showLoader: false,
    });
  }

  handleAllLaunches() {
    this.props.all_launches();
    this.setState({
      currentPage: 1,
    });
  }

  handleSuccess() {
    var newdata = sessionStorage.getItem("data");
    var data = JSON.parse(newdata);
    const result2 = data.filter((data) => data.launch_success == true);
    this.setState({
      currentPage: 1,
      launchdata: result2,
    });
  }

  handleUnsuccess() {
    var newdata = sessionStorage.getItem("data");
    var data = JSON.parse(newdata);
    const result3 = data.filter((data) => data.launch_success == false);
    this.setState({
      currentPage: 1,
      launchdata: result3,
    });
  }

  handleStartDate(event) {
    this.setState({
      startdate: event.target.value,
    });
  }
  handleEndDate(event) {
    this.setState({
      enddate: event.target.value,
    });
  }
  handleDate(data) {
    var startDate = this.state.startdate;
    var endDate = this.state.enddate;

    var result = data.filter(function (obj) {
      return obj.launch_date_utc >= startDate && obj.launch_date_utc <= endDate;
    });
    this.setState({
      launchdata: result,
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const mystyle = {
      color: "white",
      backgroundColor: "#770000",
      padding: "5%",
      fontFamily: "Arial",
      background: 'url(public/image/dashboard.jpg)no-repeat center',
      backgroundAttachment: "fixed",
    };
    const mybutton = {
      padding: "2%",
    };

    const main = {
      paddingLeft: "30%",
    };
    sessionStorage.setItem(
      "data",
      JSON.stringify(this.props.all_launches_Details)
    );
    const { handleNextClick, handlePrevClick } = this;
    const { currentPage, pageSize } = this.state;
    var data = this.state.launchdata;

    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = currentPage * pageSize;
    if (startIndex < 0) {
      startIndex = 0;
    }
    if (!data) {
      endIndex = 0;
    } else if (endIndex > data.length - 1) {
      endIndex = data.length;
    }
    const maxPages = data ? data.length / pageSize : 0;

    if (data === null) {
      return null;
    }
    if (data) {
      return (
        <div style={mystyle}>
          <Button href="/homepage">Go to Homepage</Button>
          <Navbar color="dark" light expand="md">
          <NavbarBrand href="/dashboard">
              <h1>Dashbaord</h1>
            </NavbarBrand>
            <Button onClick={() => this.handleAllLaunches()}>
              All Launches
            </Button>
            <Button onClick={() => this.handleUpcomingLaunches()}>
              Upcoming Launches
            </Button>{" "}
            <br></br> <br></br>
            <Button onClick={() => this.handlePastLaunches()}>
              Past Launches
            </Button>
            <Button
              color="primary"
              onClick={this.toggle}
              style={{ marginBottom: "1rem" }}
            >
              Filter By Date
            </Button>
            <Collapse isOpen={this.state.isOpen}>
              <Card>
                <CardBody>
                  <Form>
                    <FormGroup>
                      <Label for="startDate">Start-Date</Label>
                      <Input
                        type="date"
                        name="StartDate"
                        id="startDate"
                        placeholder="Enter Start date"
                        onChange={this.handleStartDate}
                      ></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="endDate">End-Date</Label>
                      <Input
                        type="date"
                        name="EndDate"
                        id="endDate"
                        placeholder="Enter End Date"
                        onChange={this.handleEndDate}
                      ></Input>
                    </FormGroup>
                    <Button onClick={() => this.handleDate(data)}>
                      Date Filter
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Collapse>
            <Button onClick={() => this.handleSuccess()}>
              Successfull Launches
            </Button>
            <Button onClick={() => this.handleUnsuccess()}>
              Unsuccessfull Launches
            </Button>
            <br></br>
          </Navbar>

          {data && data.length > 0 ? (
            <div style={mybutton}>
              {" "}
              <button
                className="navFooter prev"
                onClick={handlePrevClick}
                disabled={currentPage === 1 ? true : false}
              >
                {" "}
                <img alt="" />
                Prev{" "}
              </button>
              <button className="circleNum active">{currentPage}</button>{" "}
              <button className="circleNum">
                {Math.ceil(maxPages) === 0 ? 1 : Math.ceil(maxPages)}
              </button>
              <button
                className="navFooter next"
                onClick={handleNextClick}
                disabled={currentPage >= maxPages ? true : false}
              >
                {" "}
                <img alt="" />
                Next{" "}
              </button>
            </div>
          ) : (
            <div>
              <ImageGrid />
            </div>
          )}

          {data && data.length > 0 ? (
            <div>
              {data.slice(startIndex, endIndex).map((item, index) => (
                <div key={index} style={main}>
                  <br></br>
                  <Card style={{ width: 330 }}>
                    <CardImg
                      top
                      width="50%"
                      width="20%"
                      src={item.links.mission_patch_small}
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardTitle>Mission Name : {item.mission_name}</CardTitle>
                      {/* <CardText>{item.details}</CardText> */}
                      <Button onClick={() => this.showModal(item)}>
                        {" "}
                        Click here for more details
                      </Button>

                      <Modal isOpen={this.state.show} toggle={this.toggle}>
                        <ModalHeader>
                          {" "}
                          <h4> Mission Name : </h4>
                          {this.state.selectedValue &&
                            this.state.selectedValue.mission_name}
                        </ModalHeader>
                        <ModalBody>
                          {this.state.selectedValue &&
                          this.state.selectedValue.length > 0 ? (
                            <div>console.log("empty data");</div>
                          ) : (
                            <div>
                              <CardImg
                                width="20%"
                                src={
                                  this.state.selectedValue &&
                                  this.state.selectedValue.links
                                    .mission_patch_small
                                }
                                alt="Card image cap"
                              />
                              Flight Number :{" "}
                              {this.state.selectedValue &&
                                this.state.selectedValue.flight_number}
                              <br></br> <hr></hr>Launch Year:{" "}
                              {this.state.selectedValue &&
                                this.state.selectedValue.launch_year}
                              <br></br>
                              <hr></hr> Launch Date:{" "}
                              {this.state.selectedValue &&
                                this.state.selectedValue.launch_date_local}
                              <br></br> <hr></hr> Launch Site:{" "}
                              {this.state.selectedValue &&
                                this.state.selectedValue.launch_site
                                  .site_name_long}
                              <br></br>
                              <hr></hr> Launch Details:{" "}
                              {this.state.selectedValue &&
                                this.state.selectedValue.details}
                              <br></br>
                              <hr></hr> Video:{" "}
                              <a
                                href={
                                  this.state.selectedValue &&
                                  this.state.selectedValue.links.video_link
                                }
                                target="_blank"
                              >
                                YouTube Video
                              </a>
                            </div>
                          )}
                        </ModalBody>
                        <ModalFooter>
                          <Button color="secondary" onClick={this.hideModal}>
                            Cancel
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <ImageGrid />
            </div>
          )}

          {data && data.length > 0 ? (
            <div style={mybutton}>
              {" "}
              <button
                className="navFooter prev"
                onClick={handlePrevClick}
                disabled={currentPage === 1 ? true : false}
              >
                {" "}
                <img alt="" />
                Prev{" "}
              </button>
              <button className="circleNum active">{currentPage}</button>{" "}
              <button className="circleNum">
                {Math.ceil(maxPages) === 0 ? 1 : Math.ceil(maxPages)}
              </button>
              <button
                className="navFooter next"
                onClick={handleNextClick}
                disabled={currentPage >= maxPages ? true : false}
              >
                {" "}
                <img alt="" />
                Next{" "}
              </button>
            </div>
          ) : (
            <div>
              <ImageGrid />
            </div>
          )}
        </div>
      );
    } else {
      return <ImageGrid />;
    }
  }
}

const mapStateToProps = (state) => {
  console.log("state in search", state);
  return {
    all_launches_Details: state.all_launches_Details.payload,
    upcoming_launches_reducer: state.upcoming_launches_reducer.payload,
    past_launches_reducer: state.past_launches_reducer.payload,
  };
};

const actionCreators = {
  all_launches: allLaunchesActions.all_launches,
  upcoming_launches_action: upcomingLaunchesActions.upcoming_launches_action,
  past_launches_action: pastLaunchesActions.past_launches_action,
};

const connectedDashboard = connect(mapStateToProps, actionCreators)(Dashboard);
export { connectedDashboard as Dashboard };
