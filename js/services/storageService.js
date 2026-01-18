const SEARCH_HISTORY_KEY = 'search_history';

export function getSearchHistory() {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
}

export function addRecentSearch(query) {
    let history = getSearchHistory();

    history = history.filter(item => item.toLowerCase() !== query.toLowerCase());

    history.unshift(query);

    if (history.length > 10 ) {
        history = history.slice(0, 10);
    }

    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
}   