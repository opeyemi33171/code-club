"use strict";

let assert = require('assert');
let TripService = require('../src/TripService');
let User = require('../src/User')

describe('TripService', () => {

    it('should throw not logged in error', () => {      
        const mockedUserSession = {getLoggedUser: () => null}
        const userToFindTripsFor = null
        const tripService = new TripService(mockedUserSession)
        assert.throws( () => tripService.getTripsByUser(userToFindTripsFor), {message: 'User not logged in.'})
    })

    it('should return an empty array for a user who is logged in and has no friends', () => {
        const mockedUserSession = {getLoggedUser: () => new User()}
        const userWithNoFriends = {getFriends: () => []}
        const tripService = new TripService(mockedUserSession)
        const trips = tripService.getTripsByUser(userWithNoFriends)
        assert.equal(trips.length, 0)
    })

    it('should return an empty list of trips for a user who is logged in and has at least one friend who isnt the logged in user', () => {
        const mockedUserSession = {getLoggedUser: () => new User()}
        const userWithFriends = {getFriends: () => [new User()]}
        const tripService = new TripService(mockedUserSession)
        const trips = tripService.getTripsByUser(userWithFriends)
        assert.equal(trips.length, 0)
    })
    it('return trips for user who is logged in and has a friend', () => {
        const loggedInUser = new User()
        const mockedUserSession = {getLoggedUser: () => loggedInUser}
        const userWithFriends = {getFriends: () => [loggedInUser]}
        const mockDao = {findTripsByUser: (user) => [1]}
        const tripService = new TripService(mockedUserSession)
        const trips = tripService.getTripsByUser(userWithFriends, mockDao)
        assert.equal(trips.length, 1)
    })

});
