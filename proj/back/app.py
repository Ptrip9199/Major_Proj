from flask import Flask
from flask_graphql import GraphQLView
from schema import schema
from flask_cors import CORS
from database import conn
conn()
app = Flask(__name__)
cors = CORS(app)
app.debug = True



app.add_url_rule('/graphql',view_func=GraphQLView.as_view('graphql',schema=schema,graphiql=True))

if __name__ == "__main__":
    app.run()
