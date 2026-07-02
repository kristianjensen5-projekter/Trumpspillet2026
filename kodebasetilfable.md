# Fable prompt: Rebuild Trumpspillet 2026 from scratch

Build a playable browser game from scratch called "Trumpspillet 2026".

It is a 2D satirical canvas game where the player controls a cartoon caricature of Donald Trump across several absurd political mini-scenes. The game is not a realistic simulator. It should feel like a small arcade/adventure game with mini-games, cartoon effects, speech bubbles, inventory, medals, and helicopter travel between scenes.

Do not build a landing page. The first screen should be the actual game intro with a Start/Enter prompt.

## Core gameplay

- Player controls Trump in side-view 2D scenes.
- Move left/right with arrow keys.
- Jump with Space or Arrow Up.
- Interact with nearby objects using E.
- Toggle inventory with B.
- Use inventory slots with 1-4.
- Select/deselect dynamite with D.
- Tweet with T.
- M toggles music/mute.
- R resets current scene; Shift+R restarts the whole run.
- Nearby interactable objects should show subtle feedback, but the game should still work without explicit labels.

## Global systems

- There is a helicopter in most scenes. Interacting with it opens a travel menu:
  - Stay
  - Greenland
  - White House / Oval Office
  - Kremlin / Moscow
  - Epstein files
  - Mar-a-Lago Mini-Putt
- The player collects gold bars in scenes. Gold is currency.
- A Greenland shop sells:
  - Self-tanner, 3 gold: increases tan level.
  - Gold sneakers, 8 gold: speed boost / needed for Kremlin escape.
  - MAGA cap, 5 gold: improves jump / style.
  - Dynamite x5, 6 gold: can be planted with D then E.
- Inventory should show owned items and dynamite quantity.
- There are five medals, persisted in local storage:
  - Greenland flag: complete Greenland.
  - Pulitzer/news medal: reach 100% MAGA approval in Oval Office.
  - Nobel medal: beat Putin in handshake battle.
  - Art Diploma: succeed in Epstein document redaction.
  - Trophy: beat Biden at golf.
- Top UI shows progress pills for Greenland, White House, Kremlin, Epstein files, and Mar-a-Lago. Done scenes show a medal/check state.

## Tone and style

- Cartoon political satire.
- English in-game UI/dialogue.
- Bright, readable canvas art.
- Speech bubbles for Trump and NPCs.
- Use exaggerated but simple character drawings.
- Effects: sparks, screen shake, confetti, oil bursts, explosions, helicopter downwash.
- Violence should be cartoonish and absurd, not realistic.

## Intro

- Retro start screen.
- Press Enter or click Start.
- Starting the game sends Trump by helicopter to Greenland.

## Scene 1: Greenland

Environment:

- Icy Greenland landscape with mine, oil rig, roadside shop, helicopter, polar bear, Lars Lokke-style Danish politician, large glaciers, and collectible gold bars.

Mechanics:

- Trump can walk, jump, collect gold bars, interact with mine/rig/shop/bear/Lars/glaciers/helicopter.
- Mine interaction plants/claims a flag and says "Mine now."
- Oil rig interaction creates an oil burst and Trump boasts about energy.
- Shop opens purchase menu.
- Glaciers block the view. First interaction explains that explosives are needed. If the player has dynamite but has not selected it, prompt them to select dynamite.
- Planting dynamite on glaciers blows up both glaciers, triggers ice explosions and rising water, then causes an "ice" game over.
- Polar bear:
  - Normal interaction damages/annoys the bear.
  - After enough hits or dynamite, bear becomes angry and chases Trump.
  - Bear bites Trump up to 3 times.
  - Third bite triggers game over: title "EATEN BY A BEAR!", subtitle "This is very unfair treatment!"
- Lars dialogue:
  - Interacting with Lars starts absurd diplomacy.
  - Trump says increasingly blunt lines like "Mine!", "Rules are stupid.", "Pathetic danes.", "Boom. Everywhere.", "Enough talk. Now fight."
  - Lars responds with diplomatic "work group" lines.
  - After the final exchange, start a fight mini-game.
- Greenland fight mini-game:
  - Overlay title: "FIGHT FOR GREENLAND", then countdown 3, 2, 1, FIGHT.
  - Trump and Lars each have 100 HP.
  - Move with arrows/WASD.
  - Punch with E, short cooldown.
  - Lars drifts toward Trump and jabs periodically.
  - Trump punch deals 10 damage; Lars jab deals 12 damage.
  - Win: Lars is defeated, Greenland flag drops, award Greenland medal.
  - Lose: game over "KO! Lars got you. Try again."
- Dynamite on Lars should also complete Greenland and award the Greenland medal.
- Helicopter opens travel menu.

## Scene 2: White House / Oval Office

Environment:

- Oval Office with Resolute Desk, Trump behind desk, aide/yes-men group, helicopter, desk buttons.
- Buttons:
  - Green "YES"
  - Blue "NO"
  - Big red "SURPRISE"

Mechanics:

- On entry, Trump walks to the desk.
- A sequence of 3 guests enters from the right and asks political yes/no questions.
- Player answers by pressing/interacting with YES or NO buttons.
- Correct answer increases MAGA approval by about 33%.
- Wrong answer reduces approval.
- Show breaking-news feedback after each answer.
- Yes-men cheer on correct answers and boo on wrong answers.
- One guest, the QAnon Shaman, requires Trump to have used enough self-tanner. If not tan enough, the guest rejects him, the scene pauses, and the player must go back to Greenland/shop to buy/use self-tanner, then return.
- Reaching 100% MAGA approval awards the Oval/Pulitzer medal.
- Pressing the red SURPRISE button always launches a missile and causes nuclear game over.

## Scene 3: Kremlin / Moscow

Environment:

- Kremlin meeting room with Putin, helicopter, door, collectible gold statues, security cameras with sweeping vision cones.

Mechanics:

- Interacting with Putin starts a handshake/arm-wrestling mini-game.
- Handshake mini-game:
  - Info card explains: strongest handshake wins Ukraine.
  - Duration: about 6 seconds.
  - First half: mash alternating A and D.
  - Second half: mash alternating F and K.
  - A progress bar moves toward Trump or Putin.
  - If Trump's progress is above threshold at the end, Trump wins.
  - Win: plant American flag on Ukraine map, award Nobel/Kremlin medal.
  - Lose: plant Russian flag, no medal.
- Gold statues can be stolen, but only if not under camera surveillance.
- If Trump tries to steal a statue while a camera sees it:
  - Putin says "WAGNER! SEIZE HIM!"
  - Wagner soldiers chase Trump.
  - If Trump has gold sneakers, he can sprint to the helicopter and escape.
  - Without sneakers, or if caught, game over: "CAPTURED BY WAGNER".
- If dynamite is planted on Putin, trigger explosion and game over: "World Peace?"

## Scene 4: Epstein Files

Environment:

- Desk/document review mini-game, not a normal walking scene while active.
- Documents scroll vertically like a rhythm game.

Mechanics:

- Goal: redact every Trump-name occurrence before it passes the hit zone.
- Generate multiple document pages with normal names, exactly 10 Trump-name targets, and protected blue names: Bill Clinton and Bill Gates.
- Trump targets are red. Protected names are blue.
- Press E when a red Trump name crosses the tape/hit zone.
- Correct hit: black marker/redaction animation, +1 redacted.
- Missed Trump name: counts as a miss.
- More than 2 misses causes failure.
- Pressing E on protected blue names gives a penalty; more than 1 protected penalty causes failure.
- P pauses/resumes.
- At the end, the scrolling stops on a birthday drawing/art section.
- Player must click/redact the final art. Then:
  - If all 10 Trump targets were found, success ending, award Art Diploma medal.
  - Otherwise failure ending.
- Success text should imply Trump claims he was never mentioned.

## Scene 5: Mar-a-Lago Mini-Putt

Environment:

- Separate mini-golf mode with 3 holes.
- Course name: "Mar-a-Lago Mini-Putt".
- Biden is already standing near the cup with his score for each hole.

Mechanics:

- On entry, helicopter lands, Trump walks to tee, then tutorial overlay appears.
- Player aims golf ball.
- Mouse/touch: drag back from ball and release to shoot.
- Keyboard: left/right adjust aim; hold E/Space to charge; release to shoot.
- Ball physics:
  - Velocity, friction, rail/wall bounces.
  - Cup has a gentle magnet when ball is slow and near it.
  - Ball only falls in cup when inside cup radius and below speed threshold.
  - Penalty zones reset ball to tee and add a stroke.
- Three holes, par roughly 3 each.
- Biden has fixed target scores, around 4, 7, 4.
- After each hole, show banner: "Par!", "1 under par!", or "X over par".
- At end:
  - If Trump total strokes < Biden total, show "Best golfer ever!", drop trophy onto Trump, award golf medal.
  - If Trump loses, game over with newspaper/front-page style: "LOSER!" and "Sleepy Joe wins!"

## Game over / continue system

- Most failures first show cause-specific game-over art:
  - Lars fight loss
  - Ice/glacier flood
  - Bear attack
  - Nuclear missile
  - Putin dynamite
  - Wagner capture
  - Golf loss
  - Epstein fail
- Press/click to continue from game-over art into a voting-machine continue screen.
- Voting machine has slot words: DEMOCRAT, INDEPENDENT, REPUBLICAN, TRUMP.
- Clicking/pressing VOTE spins and eventually lands on TRUMP.
- Landing on TRUMP grants +1 life and resumes at the scene where Trump died.
- Clicking DEMOCRAT instead shows "RIGGED!" and restarts to intro.

## Mobile version requirements

- Portrait-first mobile layout.
- No visible joystick labels or outlines.
- Hold left half of screen to walk left; hold right half to walk right.
- Short tap near object means walk to it and interact.
- Hold one finger for direction and tap with another finger to jump.
- Menus and shop choices must be tappable, not keyboard-only.
- Golf drag/release must work on touch.

## Implementation requirements

- Build clean modular code from scratch.
- Use data-driven scene definitions.
- Keep scene state separate from render/update/input logic.
- Use constants for scene keys.
- Avoid one giant unstructured script if possible.
- The result must be playable in-browser without backend.
