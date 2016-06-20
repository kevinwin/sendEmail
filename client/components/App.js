class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <div>
          
        </div>
        <div className="heading">
          <h1>Email Somebody</h1>
        </div>
        <form action="http://localhost:3000/send" method="post">
            <div className="group">
                <input type="email" name="user_mail" /><span className="highlight"></span><span className="bar"></span>
                <label for="mail">From:</label>
            </div>
            <div className="group">
                <input type="email" name="target_user_mail" /><span className="highlight"></span><span className="bar"></span>
                <label for="mail">To:</label>
            </div>
            <div className="group">
                <input type="text" name="subject" /><span className="highlight"></span><span className="bar"></span>
                <label for="mail">Subject:</label>
            </div>
            <div className="group">
                <textarea name="message"></textarea><span className="highlight"></span><span className="bar"></span>
                <label for="msg">Message:</label>
            </div>
            <button className="button buttonBlue" type="submit"><i className="fa fa-send" aria-hidden="true"></i></button>
        </form>
        

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
