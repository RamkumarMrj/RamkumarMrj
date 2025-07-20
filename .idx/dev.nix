{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "unstable"; # or "stable-24.05";

  # Use https://search.nixos.org/packages to find packages
  packages = [
    # pkgs.go
    # pkgs.python311
    # pkgs.nodejs_24
    pkgs.nodejs_22
    # pkgs.nodePackages.nodemon
  ];

  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        web = {
          # Run your Angular app with PORT set to IDX's defined port for previews,
          # and show it in IDX's web preview panel
          command = ["sh" "-c" "cd portfolio && ng serve --host 0.0.0.0 --port $PORT"];
          manager = "web";
          env = {
            # Environment variables to set for your server
            PORT = "$PORT";
          };
        };
      };
    };


    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Example: install JS dependencies from NPM
        # npm-install = "npm install";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Example: start a background task to watch and re-build backend code
        # watch-backend = "npm run watch-backend";
      };
    };
  };
}
