import os
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()

class AddList(db.Model):
    __tablename__ = "addList"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64))
    tag = db.Column(db.Text)
    color = db.Column(db.String(20))
    pub_date = db.Column(db.DateTime, default = datetime.utcnow)
    checked = db.Column(db.Boolean, default = False)


    @property
    def serialize(self):
        return {
            'id' : self.id,
            'title' : self.title,
            'tag' : self.tag,
            'color' : self.color,
            'pub_date' : self.pub_date,
            'checked' : self.checked
        }


