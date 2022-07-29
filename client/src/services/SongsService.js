import Api from '@/services/Api'

export default{
  getAllSongs () {
    return Api().get('songs')
  },
  addSong (song) {
    return Api().post('songs', song)
  },
  put (song) {
    return Api().put(`songs/${song.id}`, song)
  },
  delete (songId) {
    return Api().delete(`songs/${songId}`)
  }
}
