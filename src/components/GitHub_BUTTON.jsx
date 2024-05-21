import React from "react";

const GitHubContributeButton = () => {
  return (
    <a
      href="https://github.com/adarsh111coffee"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4 mr-2"
      >
        <path d="M12 0C5.373 0 0 5.373 0 12a12 12 0 008.207 11.426c.6.11.793-.26.793-.577v-2.225c-3.34.727-4.042-1.613-4.042-1.613-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.082-.729.082-.729 1.204.084 1.837 1.234 1.837 1.234 1.07 1.832 2.807 1.303 3.492.996.108-.774.419-1.303.762-1.603-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.467-2.381 1.234-3.22-.123-.304-.534-1.528.118-3.183 0 0 1.008-.323 3.3 1.23a11.51 11.51 0 013.003-.404c1.018.004 2.045.137 3.003.404 2.292-1.553 3.3-1.23 3.3-1.23.653 1.655.242 2.879.118 3.183.77.839 1.233 1.91 1.233 3.22 0 4.61-2.803 5.623-5.474 5.922.43.372.823 1.102.823 2.222v3.293c0 .32.192.694.801.576A12.004 12.004 0 0024 12c0-6.627-5.373-12-12-12z" />
      </svg>
      Contribute on GitHub
    </a>
  );
};

export default GitHubContributeButton;
