"use strict";

let UserSession = require("./UserSession");
let TripDAO = require("./TripDAO");

class TripService {
  constructor(userSession=UserSession){
    this.loggedUser = userSession.getLoggedUser()
  }
  getTripsByUser(user, tripDAO = TripDAO) {
    let tripList = [];
    let isFriend = false;
    if (this.loggedUser != null) {
      isFriend = this.isFriendsWithLoggedInUser(user);
      if (isFriend) {
        tripList = tripDAO.findTripsByUser(user);
      }
      return tripList;
    } else {
      throw new Error("User not logged in.");
    }
  }
  isFriendsWithLoggedInUser(user) {
    let friends = user.getFriends();
    for (let i = 0; i < friends.length; i++) {
      let friend = friends[i];
      if (friend == this.loggedUser) {
        return true;
      }
    }
    return false;
  }
}

module.exports = TripService;
