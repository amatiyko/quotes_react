import React from 'react';
import ReactDOM from 'react-dom';

const gradientDania = 'linear-gradient(to right, #be93c5, #7bc6cc)';
const gradientSunkist = 'linear-gradient(to right, #f2994a, #f2c94c)';

class QuoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: gradientDania, 
                 author: '', 
                 quote: ''};
    this._changeColor = this._changeColor.bind(this);
    this._setQuote = this._setQuote.bind(this);
  }

  _changeColor() {
    this.setState({
      color: this.state.color == gradientDania ? gradientSunkist : gradientDania 
    });
  }
  
  _setQuote(response) {
    console.log('quote seted');
    this.setState({
      quote: response.quote,
      author: response.author
    });
  }
  
  _getQuote() {
    console.log('get it');
    $.ajax({
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
      dataType: 'json',
      cache: false,
      success: function(response) {
        this._setQuote(response);
      }.bind(this),
      error: function(err) {
        alert(err);
      }.bind(this),
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", "YmWL1IUGuimsh2Qayf6ZCLHY61XUp12fQb9jsnfc6SxsBLbFft");
      }.bind(this)
    });  
  }
  
  componentDidMount() {
      this._getQuote();
  }
  
  render() {
    return (
      <div style={{background: this.state.color}}>
          <h1 className="quoteTitle">Quote</h1>
          <Quote quote={this.state.quote} author={this.state.author} />
          <GetNewQuote GetQoute={this._getQuote.bind(this)}/>
          <button onClick={this._changeColor} className='btn color-btn'>Change Background Color</button>
      </div>
    );
  }
}

class Quote extends React.Component {
  render() {
    return (
      <div className='quote-container'>
        <p>{this.props.quote}</p>
        <small> - {this.props.author}</small>
      </div>
    );
  }
}

class GetNewQuote extends React.Component{
  handler() {
    concole.log("hello");
    this.props.GetQoute;
  }
  render() {
    return (
      <div className='buttons' onClick={this.props.GetQoute}>
        <button className="get-quote-btn btn">New Quote</button>
      </div>
    )
  }
};
        
ReactDOM.render(<QuoteApp />, document.getElementById('сontainer'));