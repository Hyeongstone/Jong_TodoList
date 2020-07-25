from flask import request, jsonify, session

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

@api.route('List/<data>', methods=['GET'])
def filter_word(data):
    filter_datas = AddList.query.filter(AddList.color == data)
    return jsonify([filter_data.serialize for filter_data in filter_datas])
