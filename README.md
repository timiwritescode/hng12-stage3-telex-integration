# TASK WATCH

## Description
Task Watch is a project management tool implemented as a **Modifier Integration** for Telex. It enables teams within Telex channels to create, delegate, manage, and set deadlines for tasks efficiently.

## Features
- Create and assign tasks using a preset delimiter.
- View all created tasks.
- Delete tasks when no longer needed.
- Mark tasks as complete upon completion.
- Receive notifications in the channel when a task is due but not marked as complete.

## App Usage on Telex
### Setting Up the App
To begin using Task Watch on Telex, follow these steps:

1. **Log in to [Telex](https://telex.im/)** (or sign up if you don’t have an account) and select the organization where you want to install the integration.
2. Navigate to the **[Apps](https://telex.im/dashboard/applications)** tab and click **Add New**.
3. Copy and paste the following URL into the popup modal that appears:
   ```
   https://task-watch-app.up.railway.app/integration.json
   ```
4. Click **Save**, and once the application appears in the list of installed apps, click **Manage App**.
5. In the **Description** tab, click **Connect App** to start using Task Watch.
6. Go to the **Settings** tab, where you can configure:
   - **Task Creation Keyword:** This is the keyword that the app recognizes as a task creation trigger. The default keyword is `TODO:` (including the colon).
   - **Channel ID:** Specify the channel ID of the channel where the app should operate.
   - **Output:** In the output tab, under configured channels, select the custom channels button and then uncheck every other channel except the channel where you want the app to work in.

