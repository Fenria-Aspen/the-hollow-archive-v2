// Cipher decoder tool

const DecoderPage = {
  render() {
    return `
      <section class="hero">
        <h1>CIPHER DECODER</h1>
        <p class="lead">Tools for decryption and analysis.</p>
      </section>

      <section class="panel">
        <p class="panel-title">CAESAR CIPHER</p>
        <div class="decoder-tool">
          <input type="text" id="caesar-input" placeholder="Enter encrypted text" />
          <label>Shift: <input type="number" id="caesar-shift" min="0" max="25" value="3" /></label>
          <button onclick="DecoderPage.decodeCaesar()">Decode</button>
          <div id="caesar-output" class="decoder-output"></div>
        </div>
      </section>

      <section class="panel">
        <p class="panel-title">VIGENÈRE CIPHER</p>
        <div class="decoder-tool">
          <input type="text" id="vigenere-input" placeholder="Enter encrypted text" />
          <label>Key: <input type="text" id="vigenere-key" placeholder="Enter cipher key" /></label>
          <button onclick="DecoderPage.decodeVigenere()">Decode</button>
          <div id="vigenere-output" class="decoder-output"></div>
        </div>
      </section>

      <section class="panel">
        <p class="panel-title">BASE64 DECODER</p>
        <div class="decoder-tool">
          <input type="text" id="base64-input" placeholder="Enter base64 text" />
          <button onclick="DecoderPage.decodeBase64()">Decode</button>
          <div id="base64-output" class="decoder-output"></div>
        </div>
      </section>

      <section class="panel">
        <p class="panel-title">HEX TO ASCII</p>
        <div class="decoder-tool">
          <input type="text" id="hex-input" placeholder="Enter hex (space-separated)" />
          <button onclick="DecoderPage.decodeHex()">Decode</button>
          <div id="hex-output" class="decoder-output"></div>
        </div>
      </section>
    `;
  },
  
  decodeCaesar() {
    const text = document.getElementById('caesar-input').value;
    const shift = parseInt(document.getElementById('caesar-shift').value);
    const result = Ciphers.caesar(text, shift);
    document.getElementById('caesar-output').textContent = result;
  },
  
  decodeVigenere() {
    const text = document.getElementById('vigenere-input').value;
    const key = document.getElementById('vigenere-key').value;
    if (!key) {
      document.getElementById('vigenere-output').textContent = 'Enter a key to decode.';
      return;
    }
    const result = Ciphers.vigenere(text, key, true);
    document.getElementById('vigenere-output').textContent = result;
  },
  
  decodeBase64() {
    const text = document.getElementById('base64-input').value;
    const result = Ciphers.base64Decode(text);
    document.getElementById('base64-output').textContent = result;
  },
  
  decodeHex() {
    const hex = document.getElementById('hex-input').value;
    try {
      const result = hex.split(' ').map(h => String.fromCharCode(parseInt(h, 16))).join('');
      document.getElementById('hex-output').textContent = result;
    } catch (e) {
      document.getElementById('hex-output').textContent = 'Invalid hex input.';
    }
  }
};
