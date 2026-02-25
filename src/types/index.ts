export interface Channel {
  id: string;
  name: string;
  stream_url: string;
  description?: string;
}

export interface Station {
  id: number;
  call_sign: string;
  name: string;
  frequency: string;
  location: string;
  description: string | null;
  stream_url: string;
  website: string | null;
  lat: number;
  lng: number;
  channels: Channel[] | null;
  disable_now_playing: boolean;
  skip_uptime_check: boolean;
  created_at: Date;
}
