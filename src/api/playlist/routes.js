const routes = (handler) => [
    {
        method: 'POST',
        path: '/playlists',
        handler: handler.postPlaylistHandler,
        options: {
            auth: 'songsapp_jwt',
        },
    },

    {
        method: 'GET',
        path: '/playlists',
        handler: handler.getPlaylistsHandler,
        options: {
            auth: 'songsapp_jwt',
        },
    },

    {
        method: 'DELETE',
        path: '/playlists/{playlistId}',
        handler: handler.deletePlaylistByIdHandler,
        options: {
            auth: 'songsapp_jwt',
        },
    },

    {
        method: 'POST',
        path: '/playlists/{playlistId}/songs',
        handler: handler.postSongHandler,
        options: {
            auth: 'songsapp_jwt',
        },
    },
    
    {
        method: 'GET',
        path: '/playlists/{playlistId}/songs',
        handler: handler.getSongsHandler,
        options: {
            auth: 'songsapp_jwt',
        },
    },

    {
        method: 'DELETE',
        path: '/playlists/{playlistId}/songs',
        handler: handler.deleteSongByIdHandler,
        options: {
            auth: 'songsapp_jwt',
        },
    },

    {
        method: 'GET',
        path: '/users',
        handler: handler.getUsersByUsernameHandler,
    },
  ];
  
module.exports = routes;
