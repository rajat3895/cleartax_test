class Kanban extends React.Component {
  render() {
    const style = {
      'padding': '30px',
      'paddingTop': '5px' };


    return (
      React.createElement("div", { style: style },
      React.createElement("h1", null, "Task Board"),
      React.createElement(KanbanBoard, null)));


  }}


class KanbanBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      projects: [],
      draggedOverCol: 0 };

    this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
    this.columns = [
      {name: 'Planned', stage: 1},
			{name: 'Started', stage: 2},
      {name: 'Done', stage: 3}
    ];

  }

  componentDidMount() {
    this.setState({ projects: projectList, isLoading: false });
  }


  handleOnDragEnter(e, stageValue) {
    this.setState({ draggedOverCol: stageValue });
  }


  handleOnDragEnd(e, project) {
    const updatedProjects = this.state.projects.slice(0);
    updatedProjects.find(projectObject => {return projectObject.name === project.name;}).project_stage = this.state.draggedOverCol;
    this.setState({ projects: updatedProjects });
  }

  render() {
    if (this.state.isLoading) {
      return React.createElement("h3", null, "Loading...");
    }

    return (
      React.createElement("div", null,
      this.columns.map(column => {
        return (
          React.createElement(KanbanColumn, {
            name: column.name,
            stage: column.stage,
            projects: this.state.projects.filter(project => {return parseInt(project.project_stage, 10) === column.stage;}),
            onDragEnter: this.handleOnDragEnter,
            onDragEnd: this.handleOnDragEnd,
            key: column.stage }));


      })));


  }}


class KanbanColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mouseIsHovering: false };
  }

  componentWillReceiveProps(nextProps) {
    this.state = { mouseIsHovering: false };
  }

  generateKanbanCards() {
    return this.props.projects.slice(0).map(project => {
      console.log(project)
      return (
        React.createElement(KanbanCard, {
          project: project,
          key: project.name,
          assignee: project.assignedTo,
          onDragEnd: this.props.onDragEnd }));


    });
  }

  render() {
    const columnStyle = {
      'display': 'inline-block',
      'verticalAlign': 'top',
      'marginRight': '5px',
      'marginBottom': '5px',
      'paddingLeft': '5px',
      'paddingTop': '0px',
      'width': '230px',
      'textAlign': 'center',
      'backgroundColor': this.state.mouseIsHovering ? '#d3d3d3' : '#f0eeee' };

    return (
      React.createElement("div", {
        style: columnStyle,
        onDragEnter: e => {this.setState({ mouseIsHovering: true });this.props.onDragEnter(e, this.props.stage);},
        onDragExit: e => {this.setState({ mouseIsHovering: false });} },

      React.createElement("h4", null, this.props.stage, ". ", this.props.name, " (", this.props.projects.length, ")"),
      this.generateKanbanCards(),
      React.createElement("br", null)));

  }}


class KanbanCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true };

  }

  render() {
    const cardStyle = {
      'backgroundColor': '#f9f7f7',
      'paddingLeft': '0px',
      'paddingTop': '5px',
      'paddingBottom': '5px',
      'marginLeft': '0px',
      'marginRight': '5px',
      'marginBottom': '5px' };


    return (
      React.createElement("div", {
        style: cardStyle,
        draggable: true,
        onDragEnd: e => {this.props.onDragEnd(e, this.props.project);} },

      React.createElement("div", null, React.createElement("h4", null, this.props.project.name),
                          React.createElement("h5", null, this.props.assignee)),

      React.createElement("div", {
        style: { 'width': '100%' },
        onClick: e => {this.setState({ collapsed: !this.state.collapsed });} },

      this.state.collapsed ? String.fromCharCode('9660') : String.fromCharCode('9650'))));



  }}


let projectList = [
{
  name: 'GST',
  
  project_stage: 1,
  assignedTo: 'Jenny'
},

{
  name: 'ITR',  
  project_stage: 2,
  assignedTo:'James'
},
{
  name: 'Metrics',
  project_stage: 3,
  assignedTo: 'Amit'
},

];

ReactDOM.render(React.createElement(Kanban, null), document.getElementById('app'));