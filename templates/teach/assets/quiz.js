/*
  TEACH reusable quiz widget (no dependencies).
  Hydrates every `.sg-quiz` block into an interactive, keyboard-operable check
  with instant feedback. Enforces the skill's quiz hygiene: option order is
  randomized on every load so the correct answer's position never leaks.

  Declarative markup it reads:
    <div class="sg-quiz" data-explain="why the answer is right">
      <p class="sg-q">Question?</p>
      <ul class="sg-options">
        <li data-correct>Correct option</li>
        <li data-hint="nudge on miss">Distractor</li>
        <li>Distractor</li>
      </ul>
    </div>
  Optional anywhere on the page: <span data-quiz-score></span> shows "n/total".
*/
(function () {
  "use strict";

  function shuffle(arr) {
    // Fisher-Yates; seeded by current option count + index so it varies per block.
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  var solved = 0, total = 0;

  function updateScore() {
    document.querySelectorAll("[data-quiz-score]").forEach(function (el) {
      el.textContent = solved + "/" + total;
    });
  }

  function hydrate(quiz) {
    var questionEl = quiz.querySelector(".sg-q");
    var list = quiz.querySelector(".sg-options");
    if (!list) return;
    total++;

    var options = Array.prototype.slice.call(list.querySelectorAll("li"));
    var group = document.createElement("div");
    group.className = "sg-choices";
    group.setAttribute("role", "group");
    if (questionEl) group.setAttribute("aria-labelledby", questionEl.id || "");

    var feedback = document.createElement("p");
    feedback.className = "sg-feedback";
    feedback.setAttribute("aria-live", "polite");
    feedback.hidden = true;

    var answered = false;

    shuffle(options).forEach(function (li) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sg-option";
      btn.innerHTML = li.innerHTML;
      btn.dataset.correct = li.hasAttribute("data-correct") ? "1" : "0";
      if (li.dataset.hint) btn.dataset.hint = li.dataset.hint;

      btn.addEventListener("click", function () {
        var isCorrect = btn.dataset.correct === "1";
        if (isCorrect) {
          btn.classList.add("is-correct");
          feedback.hidden = false;
          feedback.className = "sg-feedback ok";
          feedback.textContent = "맞아요. " + (quiz.dataset.explain || "");
          group.querySelectorAll(".sg-option").forEach(function (b) { b.disabled = true; });
          if (!answered) { solved++; updateScore(); }
          answered = true;
        } else {
          btn.classList.add("is-wrong");
          btn.disabled = true;
          feedback.hidden = false;
          feedback.className = "sg-feedback bad";
          feedback.textContent = btn.dataset.hint
            ? "다시. " + btn.dataset.hint
            : "다시 골라보세요.";
        }
      });

      group.appendChild(btn);
    });

    list.replaceWith(group);
    group.after(feedback);
  }

  function init() {
    document.querySelectorAll(".sg-quiz").forEach(hydrate);
    updateScore();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
