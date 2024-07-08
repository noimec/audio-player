import './css/style.css'

import { renderComponent } from './utils'
import { PlaylistModal } from './components/PlaylistModal'
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ContentLayout, MainLayout, OverLayout } from './components/Layout';
import { Sidebar } from './components/Sidebar';
import { Tracks } from './components/Tracks';
import { Playlist } from './components/Playlist';

const container = document.querySelector('#container');

if (container) {
    const playlistModal = PlaylistModal()
    const header = Header()
    const sidebar = Sidebar()
    const tracks = Tracks()
    const playlist = Playlist()
    const footer = Footer()

    renderComponent(container, playlistModal, 'beforeend');
    renderComponent(container, OverLayout(), 'beforeend');

    const overLayout = document.querySelector('#over-layout');

    renderComponent(overLayout!, header, 'beforeend');
    renderComponent(overLayout!, ContentLayout(), 'beforeend');
    renderComponent(overLayout!, footer, 'beforeend');

    const contentLayout = document.querySelector('#content-layout');

    renderComponent(contentLayout!, sidebar, 'beforeend');
    renderComponent(contentLayout!, MainLayout(), 'beforeend');

    const mainLayout = document.querySelector('#main-layout');

    renderComponent(mainLayout!, tracks, 'beforeend');
    renderComponent(mainLayout!, playlist, 'beforeend');
}