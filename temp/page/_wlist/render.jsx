var NavBar = React.createClass({
  render:function(){
     var data = this.props.data;
  
  
      var listNode =  Object.keys(data).map((widget)=>{
        return (
            <li role="presentation"><a href={"#__widget__"+widget}>{widget}</a></li>
          )
      })

      return (
        <h4>
          <ul className="nav nav-pills nav-stacked ">{listNode}</ul>
          </h4>
        )
  }
});

ReactDOM.render(
  <NavBar data={PCAT_WIDGET_LIST}/>,
  document.getElementById("PCAT_WidgetNavBar")
);

var Thead = React.createClass({
  render:function(){
   return (
    <thead>
      <tr>
          <th width="60px">版本号</th>
          <th width="200px">描述关键字</th>
          <th width="70px">开发者</th>
          <th width="50px">引用</th>
          <th>效果图</th>
      </tr>
      </thead>
    ) 
  }
}
  
)

var Tbody = React.createClass({
  render:function(){

    var data = this.props.data,
        name = this.props.name;

    var listNode = Object.keys(data).map((version)=>{

        var item = data[version];
       
        var isloaded = LOADLIST && LOADLIST[name] && LOADLIST[name][version];

         return (
            <tr className={isloaded ? "success":"disabled"}>
              <td>{version}</td>
              <td>{item.des}</td>
              <td>{item.author}</td>
              <td>{isloaded ? "是":"否"}</td>
              <td dangerouslySetInnerHTML={{__html:'<iframe src="'+item.url+'"></iframe>'}}></td>
            </tr>
          )

      return w;
    })


    return (
    <tbody>
        {listNode}
        </tbody>
      )

  }
})


var WidgetTable = React.createClass({
  render:function(){
    
      var data = this.props.data,
            name = this.props.name;

      return (
          <table className="table table-bordered table-hover">
          <Thead />
          <Tbody  data={data} name={name} />
          </table>
      )

  }
})


var ListBox = React.createClass({
  render:function(){
     var data = this.props.data;
  
      var listNode =  Object.keys(data).map((widget)=>{

        return (
          <div className="panel panel-primary" id={"__widget__" +widget}>
            <div className="panel-heading"><h3>{widget}</h3></div>
            
          <WidgetTable  data={data[widget]} name={widget} />
  
            </div>

        )


      })

      return (
        <div>{listNode}</div>
      );

  }
})



ReactDOM.render(
<ListBox data={PCAT_WIDGET_LIST} />,

  document.getElementById("PCAT_WidgetList")
)