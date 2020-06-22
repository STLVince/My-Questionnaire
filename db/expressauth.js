/*
 Navicat Premium Data Transfer

 Source Server         : localhost_27017
 Source Server Type    : MongoDB
 Source Server Version : 40206
 Source Host           : localhost:27017
 Source Schema         : expressauth

 Target Server Type    : MongoDB
 Target Server Version : 40206
 File Encoding         : 65001

 Date: 22/06/2020 14:08:59
*/


// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");

// ----------------------------
// Documents of users
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("expressauth");
db.getCollection("users").insert([ {
    _id: ObjectId("5eac1ce822918c44555c33a9"),
    local: {
        email: "123@qq.com",
        password: "$2a$08$Joms9yjxkQQPgJmhOPacKeZZb2Ca0Q7tB/B9s4lCtUbTVRm7PRuCy"
    },
    __v: NumberInt("0")
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for vips
// ----------------------------
db.getCollection("vips").drop();
db.createCollection("vips");

// ----------------------------
// Documents of vips
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("expressauth");
db.getCollection("vips").insert([ {
    _id: ObjectId("5eac1cee22918c44555c33aa"),
    local: {
        username: "123@qq.com"
    },
    __v: NumberInt("0")
} ]);
session.commitTransaction(); session.endSession();
