---
logic-for-documentation:
  name: "Math Makes You a Better Technical Writer: Propositional Logic"
  short-title: "Math Makes You a Better Technical Writer"
  caseStudyId: logic-for-documentation
  description: "Bad documentation is basically unprovable math. Six ideas from propositional logic that fix vague writing, with before and after rewrites."
  repo: ""
  url: ""
  images:
  show: true
  date: "2026-10-03"
  type: "blog"
  tags: ["Career"]
---

I bet you have written (or seen) this sentence before:

> "Users can reset their password if needed."

Feels fine, doesn't it? A logician would read that and flag three problems before you finish the sentence. Who's a "user"? Under what exact conditions? And what does "if needed" mean?

Nothing... "If needed" is decoration. I've written it myself so I'm guilty as well.

All this came to me because of a class I've taken senior semester, **MTH2800: Writing Math Proofs** (Shoutout to Dr. Slilaty and his sketchy [website](https://www.daniel-slilaty.xyz/)!). It got me into learning [propositional logic](https://en.wikipedia.org/wiki/Propositional_calculus), the branch of math that deals with what's true and what isn't. Bad documentation is basically unprovable math, and once you see that, you can't unsee it.

Let me introduce the main components of propositional logic, and how they connect to writing usable documentation!

## $\forall$ - Generalization

$\forall$ reads "for all" or "for every":

> $\forall x \in$ Users, $x$ can reset their password

Every user, no exceptions. The claim covers the whole set.

Vague writing hides scope. "Users can do **X**" - but which users? All of them, some of them, a specific role?

| Vague                        | Precise                                                                  |
| ---------------------------- | ------------------------------------------------------------------------ |
| "Admins can delete records." | "Every admin can delete any record in their assigned tenant."            |
| "Errors are logged."         | "Every error at level `WARN` or above is written to `/var/log/app.log`." |

## $\exists$ - Existence

$\exists$ means "there exists at least one":

> $\exists x \in$ Settings, $x$ controls the timeout value

There is at least one setting that controls the timeout. Which one? The formula doesn't say, and that's the problem with $\exists$ claims in docs: they confirm the thing exists, then leave you to find it on your own.

"There is a configuration option that disables this behavior." Cool. Where??? 🤔

The fix is small but non-negotiable: every $\exists$ claim needs an identity right after it. Name the "thing."

| Useless                                 | Useful                                            |
| --------------------------------------- | ------------------------------------------------- |
| "A flag controls this behavior."        | "The `--dry-run` flag disables writes."           |
| "There is a way to undo this action."   | "Press Ctrl+Z to undo the last action."           |
| "An error code is returned on failure." | "The API returns HTTP 422 when validation fails." |

#### Quantifier Order ($\forall x\exists y$ is not the same as $\exists x\forall y$)

The order of $\forall$ and $\exists$ changes the meaning of a sentence completely. It sounds obvious. It isn't, and it's infuriating every single time you catch it in the wild.

"$\forall$ errors, $\exists$ a solution" says every error has some fix, maybe a different one each time. "$\exists$ a solution, $\forall$ errors" says one single fix works for every error. Those are different claims.

Flip those quantifiers and you've written nonsense..

## $P \implies Q$ - The Condition Comes First

The big one. $P \implies Q$ reads "if P, then Q", where P is the condition and Q is the result:

> If the user is not authenticated $\implies$ the system returns HTTP 401

That's a contract. When P is true, Q must be true. Writers break it constantly, usually by stating the result first and the condition second, or by dropping the condition entirely.

| Broken                                               | Correct                                                         |
| ---------------------------------------------------- | --------------------------------------------------------------- |
| "Click Save. Make sure you are logged in first."     | "If you are logged in, click Save."                             |
| "The build will fail with missing dependencies."     | "If a dependency is missing, the build fails with exit code 1." |
| "Restart the service after editing the config file." | "If you edit the config file, restart the service."             |

#### Error Messages Are Contrapositives

Here's my favorite part. If $P \implies Q$ is true, then $\neg Q \implies \neg P$ is true too. Always. Same claim, flipped:

> $(P \implies Q) \equiv (\neg Q \implies \neg P)$ (By the way, $\equiv$ means equivalent, or equal)

I keep saying error messages are contrapositives, so let me be careful with that. "Disk full" isn't the contrapositive of anything. But look at what a useful failure message actually does: the request failed, so which condition didn't hold? "If you have write access, the file saves" pairs with "If the file did not save, you do not have write access". That's the contrapositive doing its job in the wild.

And the "an error occurred" school of writing? It states $\neg Q$ and stops. Your reader has a failure and zero explanations.

#### The Converse However..

The converse of $P \implies Q$ is $Q \implies P$, and it is **not equivalent** to the original. People trip on this constantly, partly because some converses happen to be true, which hides the ones that aren't. "If it is raining, the ground is wet" is true. "If the ground is wet, it is raining" is not; it could be water spilled from a bottle, or any other source of water on the ground.

Docs version: "If the user is an admin, they can delete records" is a claim about admins. "If a user can delete records, they are an admin" is a claim about who has delete access, and any other role with delete access just made your docs liars. Different claims, so write the one you mean.

## $\neg$ - Just Say It Directly

Negation breaks writing in two ways. Double negatives first, since they're the loud ones:

> "You cannot proceed without completing verification."

That means "you must complete verification to proceed." The reader just did a truth-table in their head, and that computation was your job. "Do not proceed without saving" is "Save before you proceed". "The field cannot be left empty" is "The field is required", and it appears on roughly every form ever shipped. And "It is not uncommon for this to fail" - someone typed eight words to avoid saying "this sometimes fails".

### "Not All" Is Not "No"

Then the quiet one: scope. "Not all users can edit this field" - what does that mean?

> $\neg (\forall x, P(x)) \equiv \exists x, \neg P(x)$

"Not all users can edit" means "some user cannot edit" or "there is at least one user that cannot edit the field". Not "every user cannot edit"; that one is:

> $\forall x, \neg P(x)$

If you mean "no user", say "no user". The reader shouldn't need set theory to figure out which of the two you meant.

### De Morgan's Laws

> $\neg (P \land Q) \equiv \neg P \lor \neg Q$
>
> $\neg (P \land Q) \equiv \neg P \land \neg Q$

In English, "not (A and B)" equals "not A, or not B", and "not (A or B)" equals "not A, and not B".

| Original                                                       | De Morgan equivalent                                       |
| -------------------------------------------------------------- | ---------------------------------------------------------- |
| "Do not use uppercase and special characters."                 | "Do not use uppercase. Do not use special characters."     |
| "The button is disabled unless you are logged in or verified." | "The button is enabled if you are logged in and verified." |

"Do not use uppercase and special characters" is one condition pretending to be two. Cut it in half and each half can fail, and get its own error, on its own. Short conditions scan. Long negated compound ones don't.

## "If" Is Not "If and Only If"

$P \iff Q$ means **BOTH**

1. $P \implies Q$ is true
2. $Q \implies P$ is true

both directions, and it reads "if and only if". The trap is that writers use plain "if" when they mean "if and only if", and the ambiguity bites exactly at the edge cases.

> "The button is active if a file is selected."

Is a selected file the only thing that activates the button, or can other things activate it too? If you mean the former, say "The button is active if and only if a file is selected". Longer, and the only version that means what you mean.

| Ambiguous                                         | Exact                                                                                                      |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| "The cache is cleared if you restart the server." | "The cache is cleared if and only if you restart the server. Reloading the page does not clear the cache." |

To be fair, most "if"s in docs really are one-directional, and auditing every single one for iff gets tedious fast. The ones worth checking are the ones gating an action. Use "if" for one-way conditions, and "if and only if" (or "only when") where the condition is the exact and sole trigger. One extra sentence closes the loophole.

## "Or" Is Ambiguous, "And" Is a Trap

Logic's or is inclusive: $P \lor Q$ means at least one of them is true. English "or" is a mess by comparison, sometimes inclusive, sometimes exactly-one, and docs almost never say which.

> "Contact support or submit a ticket."

Can you do both? Logical or says yes. If only one is allowed you have to write "but not both", or close it like the file format case: "The file must be `.json` or `.yaml`. Only one file is read per run."

"And" fails differently. "The user must be active and verified" leaves a reader who is active but not verified with no idea which half they violated. Split it so each half can fail on its own and the error message can point at the right one: "The user must be active. The user must be verified." Same for "Provide the API key" and "Provide the tenant ID". Two errors, two messages.

## Putting It All Together: A Rewrite

Here's a paragraph from a fictional API reference doc, and it reads like every internal wiki I've ever touched. Same shape, different nouns. Someone writes the happy path once, someone else pastes the error handling from a different era, and nobody reads the result until something breaks:

> Users need to be authenticated to use the API. Some endpoints require admin access. If the token is missing or expired, things may not work. Contact support if you have problems.

What's wrong, by the numbers:

| Sentence                               | Logic violation                                            |
| -------------------------------------- | ---------------------------------------------------------- |
| "Users"                                | Missing $\forall$ / $\exists$ scope                        |
| "Some endpoints"                       | $\exists$ without identity. Which endpoints?!              |
| "things may not work"                  | $P \implies Q$ without stating Q                           |
| "missing or expired"                   | one $\lor$ (or) where there should be two different errors |
| "Contact support if you have problems" | $\exists$ problem, never named, never located              |

The rewrite:

> Every API request must include a valid bearer token in the `Authorization` header.
>
> Every request without a valid token returns HTTP 401.
>
> If the token is missing, the response body includes `"error": "token_required"`. If the token is expired, the response body includes `"error": "token_expired"`.
>
> Endpoints marked `[admin]` in this reference require a token with the `admin` scope. A token with `user` scope returns HTTP 403 on those endpoints.
>
> If you receive a 401 or 403 response and the cause is unclear, open a ticket at `support.example.com` with the request ID from the `X-Request-ID` response header.

What actually changed:

- "every API request" instead of vague "users" (that's $\forall$ doing its job)
- specific error codes, specific endpoints named ($\exists$ with identity)
- condition before result, every time ($P \implies Q$)
- failures name the unmet condition (contrapositive)
- missing vs. expired got two separate if-then branches ($\lor$ resolved)
- the support contact has a real location and tells you what to include

Nothing new was added. The logic didn't change, the information didn't change, the precision did.
