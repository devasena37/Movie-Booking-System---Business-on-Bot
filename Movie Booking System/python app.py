from flask import Flask, render_template, request, jsonify
import csv
from collections import defaultdict

app = Flask(__name__)

# Function to read CSV data
def read_csv_data():
    movies = []
    with open('F:\BOB\csv_input.csv', mode='r', newline='') as file:
        reader = csv.DictReader(file)
        for row in reader:
            movies.append(row)
    return movies

@app.route('/', methods=['GET', 'POST'])
def index():
    movie_data = read_csv_data()

    # Categorize movies by release year
    movies_by_year = defaultdict(list)
    for movie in movie_data:
        year = movie['release_date'].split('-')[0]  # Assuming date format is 'YYYY-MM-DD'
        movies_by_year[year].append(movie)

    if request.method == 'POST':
        # Retrieve the release date from the form submission
        release_date = request.form.get('release-date')
        filtered_movies = [movie for movie in movie_data if movie['release_date'] == release_date]

        return render_template('index.html', movies=filtered_movies, search_date=release_date, movies_by_year=movies_by_year)
    else:
        return render_template('index.html', movies=movie_data, search_date=None, movies_by_year=movies_by_year)

@app.route('/search', methods=['GET'])
def search():
    release_date = request.args.get('release_date')
    movie_data = read_csv_data()

    # Filter movies by release date
    filtered_movies = [movie for movie in movie_data if movie['release_date'] == release_date]

    return jsonify(filtered_movies)  # Return search results as JSON

if __name__ == '__main__':
    app.run(debug=True)
