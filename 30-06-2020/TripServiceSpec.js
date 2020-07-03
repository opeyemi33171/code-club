"use strict";

let assert = require('assert');
let TripService = require('../src/TripService');
let User = require('../src/User')

describe('TripService', () => {

    it('should throw not logged in error', () => {
        const tripService = new TripService()        
        const mockedUserSession = {getLoggedUser: () => null}
        const userToFindTripsFor = null
        assert.throws( () => tripService.getTripsByUser(userToFindTripsFor, mockedUserSession), {message: 'User not logged in.'})
    })

    it('should return an empty array for a user who is logged in and has no friends', () => {
        const tripService = new TripService()
        const mockedUserSession = {getLoggedUser: () => new User()}
        const userWithNoFriends = {getFriends: () => []}
        const trips = tripService.getTripsByUser(userWithNoFriends, mockedUserSession)
        assert.equal(trips.length, 0)
    })

    it('should return an empty list of trips for a user who is logged in and has at least one friend who isnt the logged in user', () => {
        const tripService = new TripService()
        const mockedUserSession = {getLoggedUser: () => new User()}
        const userWithFriends = {getFriends: () => [new User()]}
        const trips = tripService.getTripsByUser(userWithFriends, mockedUserSession)
        assert.equal(trips.length, 0)
    })

});
