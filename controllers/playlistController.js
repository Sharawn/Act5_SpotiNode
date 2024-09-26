exports.showPlaylists = (req, res) => {
 
  const playlists = [
      { title: 'Chill Vibes', description: 'Relax and unwind' },
  ];

  res.render('playlist', { playlists });
};

// Array to store playlists temporarily
let playlists = [
  { title: 'Chill Vibes', description: 'Relax and unwind' },
  { title: 'Workout Hits', description: 'Get pumped up!' }
];

// Show playlists
exports.showPlaylists = (req, res) => {
  res.render('playlist', { playlists });
};

// Add a new playlist
exports.addPlaylist = (req, res) => {
  const { title, description } = req.body;
  playlists.push({ title, description });  // Add new playlist to array
  res.redirect('/playlist');  // Redirect to playlist page to show updated list

const db = require('../config/db');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // Save songs to the uploads folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});
const upload = multer({ storage: storage });

// Add song to playlist
exports.addSongToPlaylist = async (req, res) => {
    const playlistTitle = req.params.title; // Get the playlist title from URL
    const { title, artist, album } = req.body;
    const songUrl = `/uploads/${req.file.filename}`; // The path to the uploaded song file

    try {
        // Check if the playlist exists (optional)
        const [playlist] = await db.query('SELECT * FROM playlists WHERE title = ?', [playlistTitle]);
        if (playlist.length === 0) {
            return res.status(404).send('Playlist not found');
        }

        // Insert the new song into the tblmusic table
        const [result] = await db.query(
            'INSERT INTO tblmusic (title, artist, album, songUrl, playlistTitle) VALUES (?, ?, ?, ?, ?)', 
            [title, artist, album, songUrl, playlistTitle]
        );

        // Redirect back to the playlist details page
        res.redirect(`/playlist/${encodeURIComponent(playlistTitle)}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading song');
    }
};


};




// Array to store playlists temporarily
let playlist = [
  { title: 'Chill Vibes', description: 'Relax and unwind' },

];

// Show all playlists
exports.showPlaylists = (req, res) => {
  res.render('playlist', { playlists });
};

// Show details of a specific playlist
exports.showPlaylistDetails = (req, res) => {
  const playlistTitle = req.params.title;
  const playlist = playlists.find(p => p.title === playlistTitle);

  if (playlist) {
      res.render('playlistDetails', { playlist });
  } else {
      res.status(404).send('Playlist Not Found');
  }
};
