export interface Channel {
  id: string;
  name: string;
  streamUrl: string;
  description?: string;
}

type StationCore = {
  name: string;
  frequency: string;
  location: string;
  description: string | null;
  website: string | null;
  channels: Channel[] | null;
};

export interface Station extends StationCore {
  id: number;
  call_sign: string;
  stream_url: string;
  disable_now_playing: boolean;
  skip_uptime_check: boolean;
  created_at: Date;
  lat: number;
  lng: number;
}

export interface StationResponse extends StationCore {
  id: string;
  callSign: string;
  streamUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  disableNowPlaying: boolean;
}
