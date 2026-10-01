// All five acts with multiple puzzles and storyline

const Acts = {
  data: [
    {
      id: 'act1',
      title: 'ACT I: THE NAMING',
      subtitle: 'Who watches the archive?',
      acts_completed: 0,
      sections: [
        {
          id: 'intro',
          type: 'text',
          content: `You receive a message through channels that don't officially exist:

"The archive is looking for a witness. Someone to remember what others have forgotten. If you can answer the first question, the door will open."

The message cuts off. Nothing else. Just waiting.`
        },
        {
          id: 'gate',
          type: 'puzzle',
          question: 'What is the name of one who sees and testifies to truth?',
          answer: 'WITNESS',
          hints: [
            'Someone who observes.',
            'A person present at an event.',
            'W-I-T-N-E-S-S'
          ],
          successMessage: 'The first door opens. You have been acknowledged by the archive.',
          rewards: [
            { type: 'item', id: 'key_witness', name: 'Fragment: The Witness', description: 'A fragment of understanding.' },
            { type: 'evidence', id: 'letter_1', name: 'First Message', description: 'The initial contact from the archive.' }
          ]
        },
        {
          id: 'ledger_discovery',
          type: 'text',
          content: `Inside, you find a room filled with ledgers. Thousands of them. Each one contains a name that has been erased from all public records.

The pages are yellowed. Some are water-damaged. Others have been deliberately redacted. But patterns emerge—connections between names, places, dates.

One ledger in particular catches your eye. It's labeled "THE FORGOTTEN" and opens to a page marked with a faded ribbon.`
        },
        {
          id: 'ledger_puzzle',
          type: 'puzzle',
          question: 'What are things that are not remembered?',
          answer: 'FORGOTTEN',
          hints: [
            'The opposite of remembered.',
            'Lost to time.',
            'F-O-R-G-O-T-T-E-N'
          ],
          successMessage: 'The ledger opens. Its secrets begin to reveal themselves.',
          rewards: [
            { type: 'item', id: 'ledger_fragment', name: 'Ledger Page', description: 'A page from "The Forgotten".' },
            { type: 'evidence', id: 'names_list', name: 'List of Names', description: 'Erased from history. Never to be known.' }
          ]
        },
        {
          id: 'encrypted_message',
          type: 'text',
          content: `At the bottom of the page, you find text in a strange cipher:

THJ PWKZRJ WJNJNGJWU

Next to it, a handwritten note: "Caesar knew many secrets. His shift was always three."

This is your first real test.`
        },
        {
          id: 'cipher_puzzle',
          type: 'interactive',
          tool: 'caesar_decoder',
          encrypted: 'THJ PWKZRJ WJNJNGJWU',
          shift: 3,
          hint: 'The Roman leader Caesar used a simple cipher to protect his messages. Shift each letter by 3 places backward.',
          successMessage: 'You have decrypted the message. Continue reading.',
          rewards: [
            { type: 'item', id: 'cipher_knowledge', name: 'Caesar Cipher Knowledge', description: 'Understanding of ancient encryption methods.' }
          ]
        },
        {
          id: 'decrypted_message',
          type: 'text',
          content: `The cipher reveals:

"THE ARCHIVE REMEMBERS"

Below the decrypted text, more handwriting:

"Every name in these ledgers was someone. Every crossed-out line was a life. The archive does not forget. It merely waits for someone to bear witness. 

Will you remember them?

- The First Keeper"`
        },
        {
          id: 'message_puzzle',
          type: 'puzzle',
          question: 'What does the archive do?',
          answer: 'THE ARCHIVE REMEMBERS',
          hints: [
            'A statement about the archive\'s purpose.',
            'THE ARCHIVE _______',
            'THE ARCHIVE REMEMBERS'
          ],
          successMessage: 'Act I complete. You have taken the first step.',
          rewards: [
            { type: 'item', id: 'act1_complete', name: 'Act I Completion', description: 'You have witnessed the first truth.' },
            { type: 'unlock', id: 'act2', section: 'act2' }
          ]
        }
      ]
    },
    {
      id: 'act2',
      title: 'ACT II: THE VAULT',
      subtitle: 'Where are the forbidden names kept?',
      acts_completed: 1,
      sections: [
        {
          id: 'intro',
          type: 'text',
          content: `Now that you have proven yourself a witness, the archive grants access to deeper layers.

A message appears:

"The names must be stored somewhere. Protected. Hidden from those who would erase them further.

There is a vault. Only the worthy may enter.

The code is hidden in silence."`
        },
        {
          id: 'vault_puzzle',
          type: 'puzzle',
          question: 'What is the absence of sound called?',
          answer: 'SILENCE',
          hints: [
            'The lack of noise.',
            'Quiet. Still. Absolute quiet.',
            'S-I-L-E-N-C-E'
          ],
          successMessage: 'The vault recognition system accepts your answer.',
          rewards: [
            { type: 'item', id: 'vault_access', name: 'Vault Access Card', description: 'Permission to enter the restricted sections.' }
          ]
        },
        {
          id: 'vault_interior',
          type: 'text',
          content: `Inside the vault, rows upon rows of metal filing cabinets stretch into darkness. Each drawer is labeled with a number, a date, a location.

You notice one cabinet is different. Its label glows faintly:

"DEPARTMENT OF INTERNAL AFFAIRS - 1987 - CLEARANCE REQUIRED"

Next to it, a code lock with illuminated buttons.`
        },
        {
          id: 'number_sequence',
          type: 'puzzle',
          question: 'What is the next number in this sequence? 1, 1, 2, 3, 5, 8, 13, ?, ?',
          answer: '21',
          alternate_answers: ['21, 34'],
          hints: [
            'This is a famous mathematical sequence.',
            'Each number is the sum of the two before it.',
            'Fibonacci sequence: 21 is next.'
          ],
          successMessage: 'The cabinet drawer slides open.',
          rewards: [
            { type: 'evidence', id: 'classified_file', name: 'Classified File', description: 'Contents: REDACTED' }
          ]
        },
        {
          id: 'file_discovery',
          type: 'text',
          content: `The drawer contains a single manila envelope marked with a red stamp: EYES ONLY.

Inside, a stack of photographs. They show a door. Not a metaphorical door—an actual, physical door in what appears to be a basement or bunker.

The photographs are dated 1987. The last one has a single word written on the back in faded ink:

DOOR

And then, a question in different handwriting:

"What is on the other side? What did they hide behind the DOOR?"`
        }
      ]
    },
    {
      id: 'act3',
      title: 'ACT III: THE CIPHER',
      subtitle: 'What message did they try to hide?',
      acts_completed: 2,
      sections: [
        {
          id: 'intro',
          type: 'text',
          content: `The photographs lead you deeper into the archive's restricted records section.

You discover a series of documents, each one encrypted with different methods. The archive seems to have tested many cipher techniques over the decades.

This is where the real secrets are kept.`
        }
      ]
    },
    {
      id: 'act4',
      title: 'ACT IV: THE WITNESS',
      subtitle: 'What is the truth?',
      acts_completed: 3,
      sections: [
        {
          id: 'intro',
          type: 'text',
          content: `You've gathered the pieces. You've decrypted the messages. You've found the evidence.

But now you face a choice: What will you do with what you know?

The archive presents its final test: A choice between truth and mercy, between exposure and silence.`
        }
      ]
    },
    {
      id: 'act5',
      title: 'ACT V: REMEMBER',
      subtitle: 'Who are you now?',
      acts_completed: 4,
      sections: [
        {
          id: 'intro',
          type: 'text',
          content: `This is the final act.

Everything has led here. Every cipher decoded. Every name remembered. Every truth uncovered.

Now you must speak the final phrase—the one that binds you to the archive forever.

To speak it is to become part of what you have discovered. To remember is to become a keeper of these secrets.

Are you ready?`
        }
      ]
    }
  ],
  
  render(actId) {
    const act = this.data.find(a => a.id === actId);
    if (!act) return `<p>Act not found.</p>`;
    
    let html = `
      <section class="hero act-hero">
        <div class="act-indicator">ACT ${act.acts_completed + 1} / 5</div>
        <h1>${act.title}</h1>
        <p class="lead">${act.subtitle}</p>
      </section>
    `;
    
    for (let section of act.sections) {
      html += this.renderSection(section);
    }
    
    return html;
  },
  
  renderSection(section) {
    switch (section.type) {
      case 'text':
        return `
          <section class="panel story-panel">
            <p class="panel-content">${section.content.split('\n\n').join('</p><p class="panel-content">')}</p>
          </section>
        `;
      
      case 'puzzle':
        return `
          <section class="panel puzzle-panel" data-puzzle-id="${section.id}">
            <p class="panel-title">PUZZLE: ${section.id.toUpperCase()}</p>
            <p class="puzzle-question">${section.question}</p>
            <form class="puzzle-form" data-puzzle-id="${section.id}">
              <input type="text" placeholder="Your answer" autocomplete="off" />
              <button type="submit">Submit Answer</button>
              <button type="button" class="hint-btn">Get Hint</button>
            </form>
            <p class="puzzle-result" aria-live="polite"></p>
          </section>
        `;
      
      case 'interactive':
        return `
          <section class="panel interactive-panel" data-tool="${section.tool}">
            <p class="panel-title">DECRYPTION TOOL</p>
            <p>Encrypted text: <code>${section.encrypted}</code></p>
            <p>${section.hint}</p>
            <div id="tool-${section.id}"></div>
          </section>
        `;
      
      default:
        return '';
    }
  },
  
  attach() {
    // Attach puzzle handlers
    document.querySelectorAll('.puzzle-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const puzzleId = form.dataset.puzzleId;
        const answer = form.querySelector('input').value;
        this.checkPuzzle(puzzleId, answer);
      });
      
      form.querySelector('.hint-btn').addEventListener('click', () => {
        const puzzleId = form.dataset.puzzleId;
        this.showHint(puzzleId);
      });
    });
  },
  
  checkPuzzle(puzzleId, answer) {
    // Implemented in UI handler
  },
  
  showHint(puzzleId) {
    // Implemented in UI handler
  }
};
