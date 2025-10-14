# O-GARDISTE

**O-Gardiste** is a feature-rich, user-friendly, fast and responsive client for **Ollama** developed with Vue and framework Nuxt.

It aims to go against the grain of UI models. With models running directly on your device. This client AI also supports the vision offered by some models.

This app does not host a **Ollama server** on device, but rather connects to one using its api endpoint.

You don't know what **Ollama** is? Learn more at [ollama.com](https://ollama.com/).

## Key Features of O-GARDISTE 🚀

- 🏁 Detect when Ollama server is running.
- 🤖 Detect models already installed on Ollama.
- 🎭 Download a model from the list or a specific one.
- 📸 Upload image when model has vision capability.
- ⚙️ Activated stream.
- ⚙️ Activated the context.
- ⚙️ Change the Ollama server address.
- 🌡 Choose a temperature of the responses of model.
- 🧹 Delete existing model.
- 📱 Responsive Design: Enjoy a seamless experience across Desktop PC, Laptop, and Mobile devices.
- 📲 Progressive Web App (PWA): Enjoy a native app-like experience on your device with our PWA, providing offline access on localhost and a seamless user interface.
- 🌟 Continuous Updates: We are committed to improving O-GARDISTE with regular updates, fixes, and new features.

## Next Features update for O-GARDISTE 🔮

- ⚙️ Define all possible parameters when running the model (num_ctx, repeat_last_n, repeat_penalty, etc...).
- 🤖 Running Embedding Models.

## Screeshots

<p><img src="https://github.com/Nice-7TN/ogardiste/blob/main/public/images/desktop-screenshot.png" width="412" />
<img src="https://github.com/Nice-7TN/ogardiste/blob/main/public/images/desktop-screenshot-discussion.png" width="412" /></p>
<p >
<img src="https://github.com/Nice-7TN/ogardiste/blob/main/public/images/mobile-screenshot.png" width="204" />
<img src="https://github.com/Nice-7TN/ogardiste/blob/main/public/images/mobile-screenshot-discussion.png" width="204" />
<img src="https://github.com/Nice-7TN/ogardiste/blob/main/public/images/mobile-screenshot-settings.png" width="204" />
<img src="https://github.com/Nice-7TN/ogardiste/blob/main/public/images/mobile-screenshot-add-model.png" width="204" />
</p>

## Installation 🧑‍💻

You can install the application [locally](#install-o-gardiste) or use the [O-GARDISTE](https://o.gardiste.workers.dev/) web version.

⚠️⚠️⚠️ If you're using the **web online**, it's important to **set the Ollama server CORS origins** and **server and expose it to the network**. To do this, follow the instructions in the [Configuring Ollama Environment Variables](#setting-environment-variables-ollama) section.

### Install Ollama

- For **Linux, MacOS or Windows**:

  - Download Ollama at [ollama.com](https://ollama.com/) and **install it**.

- For **Android**:

  - Download & install the APK [Termux](https://f-droid.org/en/packages/com.termux/).
  - Launch Termux.
  - Commands to enter in the Termux terminal:

  ```
  termux-setup-storage
  pkg update
  pkg upgrade
  pkg install ollama
  ollama serve
  ```

#### Setting environment variables Ollama

##### On Mac

If Ollama is run as a MacOS application, environment variables should be set using launchctl:

- For each environment variable, call launchctl setenv in the terminal:

```
launchctl setenv OLLAMA_HOST "0.0.0.0:11434"
launchctl setenv OLLAMA_ORIGINS "*"
```

or

```
export OLLAMA_HOST=http://0.0.0.0:11434
export OLLAMA_ORIGINS="*"
```

- Restart Ollama application.

##### On Linux

If Ollama is run as a systemd service, environment variables should be set using systemctl:

- Edit the systemd service by calling systemctl edit ollama.service. This will open an editor.

- For each environment variable, add a line Environment under section [Service]:

```
[Service]
Environment="OLLAMA_HOST=0.0.0.0:11434"
Environment="OLLAMA_ORIGINS=*"
```

or in the terminal:

```
export OLLAMA_HOST=http://0.0.0.0:11434
export OLLAMA_ORIGINS="*"
```

- Save and exit.

- Reload systemd and restart Ollama:

```
systemctl daemon-reload
systemctl restart ollama
```

##### On Windows

On Windows, Ollama inherits your user and system environment variables.

- First Quit Ollama by clicking on it in the task bar.

- Start the Settings (Windows 11) or Control Panel (Windows 10) application and search for environment variables.

- Click on Edit environment variables for your account.

- Edit or create a new variable for your user account for OLLAMA_HOST, OLLAMA_MODELS, etc.

- Click OK/Apply to save.

- Start the Ollama application from the Windows Start menu.

### Install O-GARDISTE

#### Setup

1. Clone the repository:

```
git clone https://github.com/Nice-7TN/ogardiste
cd ogardiste
```

2. Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

3. Start the development server:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn run dev

# bun
bun run dev
```

4. Open http://localhost:3000 in your browser

#### Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Why I made O-Gardiste?

I developed O-Gardiste initially because there wasn't a GUI client included with Ollama and also to have complete control over my data, without relying on a trusted third party.

I also wanted to take the opportunity to deepen my knowledge of everything related to artificial intelligence, and its possibilities, particularly those offered by open source.

Having achieved something I'm happy with, I'm taking the opportunity to share my creation, hoping above all that it can be useful to others. Whether by developing it, simply recovering parts of it, or launching a project, it doesn't matter as long as it serves the community.

## Contributing

Contributions to O-Gardiste are welcome! Please feel free to submit issues, feature requests, or pull requests to help improve the extension.

## Acknowledgements

- Ollama
- Llama.cpp
- Vue.js
- Nuxt.js
- Vuetify

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/Nice-7TN/ogardiste/blob/main/LICENSE) file for details.
