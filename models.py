import os
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class AddList(db.Model):
    __tablename__ = "List"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64))
    color = db.Column(db.String(20))
    tag = db.Column(db.String(32))
