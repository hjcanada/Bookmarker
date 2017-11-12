var Bookmarks = React.createClass({

	getInitialState: function() {
		var init = { 
			form: {siteName: null, siteUrl: null},
			bookmarks: [],
		} 

		if (localStorage.getItem("bookmarks")) {
			init.bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
		}
		
		return init;
	},

	onChange: function(e) {
		this.state.form[e.target.name] = e.target.value;
		this.setState({form: this.state.form});
	},

	fetchBookmarks: function() {
		if (localStorage.getItem("bookmarks")) {
			var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
			this.setState({bookmarks: bookmarks});
		}
	},

	handleSubmit: function(e) {
		e.preventDefault();
		if (this.validateForm()) {
			this.saveBookmark();
			this.setState({form: {}});
			this.refs.myForm.reset();
			this.fetchBookmarks();
		}		
	},

	validateForm: function() {
		if (!this.state.form.siteName || !this.state.form.siteUrl) {
			alert("Please fill in the form!");
			return false;
		}

		var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp(expression);

		if (!this.state.form.siteUrl.match(regex)) {
			alert("Invalid Site URL!");
			return false;
		}

		return true;
	},
			
	saveBookmark: function() {
		var bookmark = this.state.form;
		var bookmarks = [];
		if (localStorage.getItem("bookmarks")) {
			bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
		}

		bookmarks.push(bookmark);
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	},

	deleteBookmark: function(url) {
		var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
		for (var i = 0; i < bookmarks.length; i++) {
			if (bookmarks[i].siteUrl === url) {
				bookmarks.splice(i, 1);
			}
		}
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
		this.fetchBookmarks();
	},

	render: function() {
		var bookmarkItem = this.state.bookmarks.map((bookmark) => 
					<div className="well" key={bookmark.siteName}>
						<h3>
						{ bookmark.siteName }
						<button className="btn btn-lg btn-danger pull-right" target="_blank" onClick={()=>this.deleteBookmark(bookmark.siteUrl)}>Delete</button>
						<a className="btn btn-lg btn-default pull-right" target="_blank" href={ bookmark.siteUrl }>Visit</a>
						</h3>
					</div>
		);

		return(
			<div className="content">
				<h1>Bookmarker via ReactJS Framework</h1>
				<hr/>

				<div className="jumbotron text-center">
					<fieldset>
						<legend>Bookmark Your Favourate Sites</legend>
						<form ref="myForm" onSubmit={this.handleSubmit} noValidate>
							<div className="form-group">
								<label htmlFor="siteName">Site Name</label>
								<input type="text" id="siteName" name="siteName" className="form-control input-lg" placeholder="Enter the site name..." onChange={this.onChange}/>
							</div>
							<div className="form-group">
								<label htmlFor="siteUrl">Site Url</label>
								<input type="text" id="siteUrl" name="siteUrl" className="form-control input-lg" placeholder="Enter the site URL..." onChange={this.onChange}/>
							</div>
							<input type="submit" value="Submit" className="btn btn-lg btn-primary"/>
						</form>
					</fieldset>
				</div>

				<div className="row">
					<div className="col-md-12">
						{ bookmarkItem }
					</div>
				</div>
			</div>
		)
	}

});

ReactDOM.render(
	<Bookmarks />,
	document.getElementById("root")
);
