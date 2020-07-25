from flask import request, jsonify, session
from datetime import datetime
from models import AddList, db
from . import api


@api.route('/List', methods=['GET','POST'])
def addList():
    if request.method == "POST":
        
        title = request.form.get('title')
        color = request.form.get('color')
        tag = request.form.get('tag')

        addList = AddList()
        addList.title = title
        addList.tag = tag
        addList.color = color

        db.session.add(addList)
        db.session.commit()

        Lists = AddList.query.all()

        return jsonify([mkList.serialize for mkList in Lists]), 201
    
    Lists = AddList.query.all()

    return jsonify([mkList.serialize for mkList in Lists]) 

@api.route('List/<filter_word>', methods=['GET'])
def time_filter(filter_word):
    datetime_datas = AddList.query.order_by(AddList.pub_date.desc()).all()
    [datetime_data.serialize for datetime_data in datetime_datas]
    return jsonify([datetime_data.serialize for datetime_data in datetime_datas])
