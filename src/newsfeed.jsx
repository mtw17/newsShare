var NewsFeed = React.createClass({

 getInitialState: function() {
    return {data: []};
},

componentDidMount: function() {
	 var socket = io.connect();
	 var self = this;
	 var source = this.props.feed;
$.ajax({
	url: source,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/articles', status, err.toString());
      }.bind(this)
    });

	socket.on('article saved', function (d) {
		$.ajax({
      url: source,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(self),
      error: function(xhr, status, err) {
        console.error('/api/articles', status, err.toString());
      }.bind(this)
    }).delay(2000);

	});

  },

	render: function () {
		var posts = this.state.data.map(function (post) {
			return <NewsArticle key={post.id}  title={post.title} author={post.author} content={post.content} url={post.url} id={post.id}/>
		});

		return <div><ul id="postCont">{posts}</ul></div>
	}
});



var NewsArticle = React.createClass({

    render: function(){
	    return (
	    <li className="article"  data-articleid={this.props.id}>
	<div className="arcontainer">
	<div className="articleHeading"><h4><a href={this.props.url}>{this.props.title}</a></h4></div>
	<div className="arc"><p className="author">
		by <strong>{this.props.author}</strong></p>
		<p>{this.props.content.substring(0,300)}…</p>
	   </div>
	<div className="arbottom">
	<a className="readMore" href={this.props.url}>MORE</a>
	</div>
</div>
	    </li>
	    );
    }
});
