export type Source = {
  src_path: string
  action: 'move' | 'copy' | 'hardlink' | 'softlink'
  media_type: 'tv' | 'movie' | 'auto'
  tv_shows_output: string
  movies_output: string
}

export type SortOperation = {
  input_path: string
  output_path: string
  action: string
  type: string
  exception?: string
}
