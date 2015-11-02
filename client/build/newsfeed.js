var NewsFeed = React.createClass({displayName: "NewsFeed",

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
			return React.createElement(NewsArticle, {key: post.id, title: post.title, author: post.author, content: post.content, url: post.url, id: post.id})
		});

		return React.createElement("div", null, React.createElement("ul", {id: "postCont"}, posts))
	}
});



var NewsArticle = React.createClass({displayName: "NewsArticle",

    render: function(){
	    return (
	    React.createElement("li", {className: "article", "data-articleid": this.props.id}, 
	React.createElement("div", {className: "arcontainer"}, 
	React.createElement("div", {className: "articleHeading"}, React.createElement("h4", null, React.createElement("a", {href: this.props.url}, this.props.title))), 
	React.createElement("div", {className: "arc"}, React.createElement("p", {className: "author"}, 
		"by ", React.createElement("strong", null, this.props.author)), 
		React.createElement("p", null, this.props.content.substring(0,300), "…")
	   ), 
	React.createElement("div", {className: "arbottom"}, 
	React.createElement("a", {className: "readMore", href: this.props.url}, "MORE")
	)
)
	    )
	    );
    }
});
