CREATE TABLE stations (
  id SERIAL PRIMARY KEY,
  call_sign VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  frequency VARCHAR(20) NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT,
  stream_url TEXT NOT NULL,
  website TEXT,
  lat DECIMAL(9,6) NOT NULL,
  lng DECIMAL(9,6) NOT NULL,
  channels JSONB,
  disable_now_playing BOOLEAN DEFAULT false,
  skip_uptime_check BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE uptime_logs (
  id SERIAL PRIMARY KEY,
  station_id INTEGER REFERENCES stations(id) ON DELETE CASCADE,
  checked_at TIMESTAMP DEFAULT NOW(),
  is_up BOOLEAN NOT NULL,
  response_time_ms INTEGER,
  error_message TEXT
);

CREATE INDEX idx_uptime_logs_station_id ON uptime_logs(station_id);
CREATE INDEX idx_uptime_logs_checked_at ON uptime_logs(checked_at);

CREATE TABLE now_playing (
  station_id INTEGER PRIMARY KEY REFERENCES stations(id),
  title VARCHAR(1000),
  updated_at TIMESTAMP DEFAULT current_timestamp NOT NULL
);

CREATE TABLE now_playing_history (
  id SERIAL PRIMARY KEY,
  station_id INTEGER REFERENCES stations(id),
  title VARCHAR(1000),
  logged_at TIMESTAMP DEFAULT current_timestamp NOT NULL
);

CREATE INDEX idx_now_playing_history_station_id ON now_playing_history(station_id);
CREATE INDEX idx_now_playing_history_logged_at ON now_playing_history(logged_at);
