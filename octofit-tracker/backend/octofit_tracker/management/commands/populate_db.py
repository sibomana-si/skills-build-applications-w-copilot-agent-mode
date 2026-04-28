from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models
from pymongo import MongoClient
from django.conf import settings

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Connect to MongoDB directly for index creation
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Drop collections if they exist
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Create unique index on email for users
        db.users.create_index([('email', 1)], unique=True)

        # Sample users (superheroes)
        users = [
            {'name': 'Clark Kent', 'email': 'superman@dc.com', 'team': 'DC'},
            {'name': 'Bruce Wayne', 'email': 'batman@dc.com', 'team': 'DC'},
            {'name': 'Diana Prince', 'email': 'wonderwoman@dc.com', 'team': 'DC'},
            {'name': 'Tony Stark', 'email': 'ironman@marvel.com', 'team': 'Marvel'},
            {'name': 'Steve Rogers', 'email': 'captainamerica@marvel.com', 'team': 'Marvel'},
            {'name': 'Natasha Romanoff', 'email': 'blackwidow@marvel.com', 'team': 'Marvel'},
        ]
        db.users.insert_many(users)

        # Teams
        teams = [
            {'name': 'Marvel', 'members': ['Tony Stark', 'Steve Rogers', 'Natasha Romanoff']},
            {'name': 'DC', 'members': ['Clark Kent', 'Bruce Wayne', 'Diana Prince']},
        ]
        db.teams.insert_many(teams)

        # Activities
        activities = [
            {'user': 'Clark Kent', 'activity': 'Flying', 'duration': 60},
            {'user': 'Bruce Wayne', 'activity': 'Martial Arts', 'duration': 45},
            {'user': 'Diana Prince', 'activity': 'Sword Training', 'duration': 50},
            {'user': 'Tony Stark', 'activity': 'Engineering', 'duration': 70},
            {'user': 'Steve Rogers', 'activity': 'Running', 'duration': 40},
            {'user': 'Natasha Romanoff', 'activity': 'Espionage', 'duration': 55},
        ]
        db.activities.insert_many(activities)

        # Leaderboard
        leaderboard = [
            {'team': 'Marvel', 'points': 165},
            {'team': 'DC', 'points': 155},
        ]
        db.leaderboard.insert_many(leaderboard)

        # Workouts
        workouts = [
            {'user': 'Clark Kent', 'workout': 'Strength', 'reps': 100},
            {'user': 'Bruce Wayne', 'workout': 'Endurance', 'reps': 80},
            {'user': 'Diana Prince', 'workout': 'Agility', 'reps': 90},
            {'user': 'Tony Stark', 'workout': 'Cardio', 'reps': 60},
            {'user': 'Steve Rogers', 'workout': 'HIIT', 'reps': 70},
            {'user': 'Natasha Romanoff', 'workout': 'Flexibility', 'reps': 85},
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
