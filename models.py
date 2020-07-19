import os
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class AddList(db.Model):
    __tablename__ = "addList"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64))
    color = db.Column(db.String(20))

    addTags = db.relationship('AddTag', backref='addList', lazy=True)

    @property
    def serialize(self):
        return {
            'id' : self.id,
            'title' : self.title,
            'color' : self.color
        }

class AddTag(db.Model):
    __tablename__ = "addTag"
    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.String(20))
    addList_title = db.Column(db.String(64), db.ForeignKey('addList.title'))
    
    @property
    def serialize(self):
        return {
            'id' : self.id,
            'tag' : self.tag,
            'addList_title' : self.addList_title
        }

