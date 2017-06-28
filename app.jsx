var FOOD = [
  {
    name: "Milk",
    quantity: 1,
    id: 1,
  },
  {
    name: "Eggs",
    quantity: 1,
    id: 2,
  },
  {
    name: "Lemons",
    quantity: 1,
    id: 3,
  }
];

var nextId = 4;

var AddFoodForm = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired,
  },

  getInitialState: function(){
    return{
      name: "",
    };
  },

  onNameChange: function(e){
    this.setState({name: e.target.value});
  },

  onSubmit: function(e){
    e.preventDefault();
    this.props.onAdd(this.state.name);
    this.setState({name: ""});
  },
  render: function(){
    return(
      <div className="add-food-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.name} onChange={this.onNameChange} />
          <input type="submit" value="Add Food Item" />
        </form>
      </div>
    );
  }
});

function Header(props){
  return(
      <div className = "header">
        <h1>{props.title}</h1>
      </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
};

function Food(props){
  return(
    <div className = "food">
      <div className = "food-name">
        {props.name}
      </div>
      <div className = "food-quantity">
        <Counter quantity={props.quantity} onChange={props.onQuantityChange} />
      </div>
    </div>
  );
}

Food.propType = {
  name: React.PropTypes.string.isRequired,
  quantity: React.PropTypes.number.isRequired,
  onQuantityChange: React.PropTypes.func.isRequired,
}

var Counter = React.createClass({
  incrementCount: function(){
    this.setState({
      count: this.state.count + 1
    });
  },
  decrementCount: function(){
    this.setState({
      count: this.state.count - 1
    });
  },
  getInitialState: function(){
     return {
       count: 0
     }
  },
  render: function(){
    return (
      <div className="counter">
            <button className="counter-action-decrement" onClick={this.decrementCount}>-</button>
        <div className="counter-quantity">{this.state.count}</div>
        <button className="counter-action-increment" onClick={this.incrementCount}>+</button>
      </div>
    );
  }
});
  
Counter.propTypes = {
  quantity: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
}

var Application = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    initialFoods: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      quantity: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired,
      })).isRequired,
    },

    getDefaultProps: function(){
      return {
        title:"Shopping Get List",
      }
    },

    getInitialState: function(){
      return {
        foods: this.props.initialFoods,
      };
    },
  
  onQuantityChange: function(index, delta) {
      this.state.food[index].quantity += delta;
      this.setState(this.state);
    },

    onFoodAdd: function(name) {
      console.log("Food Added:", name);
      this.state.foods.push({
          name: name,
          quantity: 0,
          id: nextId,
        });
        this.setState(this.state);
      nextId += 1;
    },

  render: function(){
      return(
      <div className = "shoppinglist">
        <Header title={this.props.title} />

        <div className = "foods">
          {this.state.foods.map(function(food, index){
            return (
              <Food 
                onQuantityChange={function(delta) {this.onQuantityChange(index ,delta)}.bind(this)}
                name={food.name} 
                quantity={food.quantity} 
                key={food.id} 
              />
            );
          }.bind(this))}
        </div>
        <AddFoodForm onAdd={this.onFoodAdd} />
      </div>
      );
  }
});


ReactDOM.render(<Application initialFoods={FOOD} />, document.getElementById('container'));