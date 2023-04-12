# Accessibility

## Disclaimer!

I do not use assistive technology outside of testing. I have not had the opportunity to receive feedback from users of assistive technology so there is a very good chance my best effort to make the site accessible falls short.

## Accessibility testing

-   I added the eslint-plugin-jsx-a11y code linter and the vscode extension "axe Accessibility Linter"
    to help catch common errors while coding.
-   Did manual keyboard testing for keyboard accessibility
-   Ran additional browser accessibility tools "Accessibility Insights for Web"
    and "Axe Dev Tools" (the free scan).
-   Checked color contrast for hover/focus states with "Color contrast analyzer" app
-   Used MacOS voiceover as a screen reader (I did not check with any other screen readers.)
-   Used screen reader router to check items in router windows i.e. forms, heading, landmarks, etc

## Notes:

As I was coding this I used semantic html as much as possible to take advantage of the built in accessibility features & user expectations of the elements.

I relied on the screen reader and its router to see how it was identifying different areas and added aria labels where I though was appropriate.

    For example, the messages `<ul>` uses the heading "Messages" as a label and appears in the router as "Messages list" rather than just "list."

**Page Title:**

-   Set the title tag so users know what tab they are on.

**Messages and Notes**

-   Visually, the message card has a different color depending on if it's from a customer or agent.
    I added additional screen reader text which announces who the message is from before the message text is read.

        For example: A message exchange would be announced like this:
        "Customer, Hi how are you." <br>
        "Agent Creed Bratton,: Hi there, is there anything we can do for you today"

-   The notes are created by agents, visually the agent name (if present) appears below the note text.
    Additional screen reader text was added when announcing the agent name.

        For example: "This customer wants to print something I am sure - Agent Creed Bratton"

-   The messages/notes list has a set height and will show a scroll bar if the items exceed the height.
    I added a tabindex={0} to the `<ul>` element so it was accessible by keyboard users. I don't think this is a great solution. It would have been better to use pagination.

**Add Message and Add Note Forms**

-   Basic validation is run as the user enters content into the input.
-   If there is an error, the input border changes to red, the submit button is disabled and
    an error message appears below.
-   A screen reader will pick up error message changes via the aria-live="polite" attribute.

**Feedback when submitting a new message or note**

-   I took advantage of Apollo clients `onCompleted`, `onError` function to show a
    generic toast message on success/error.
-   I'm using react-toastify which has a role="alert" attribute which will be picked up
    by the screen reader as it appears.
