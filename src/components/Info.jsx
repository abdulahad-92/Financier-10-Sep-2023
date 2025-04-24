import React from "react";

export default function Info() {
  return (
    <article id="Info">
      <header className="Info_header">
        <h1>Financier - Your Personal Money Manager</h1>
      </header>

      <div className="Info_container">
        <p>
          Welcome to Financier, your ultimate financial companion. Easily track
          and manage your expenses, gain control of your finances, and achieve
          your financial goals effortlessly. Say goodbye to financial stress and
          hello to financial freedom with Financier.
        </p>

        <h2 className="myText">It provides the following features</h2>
        <h2>Managing Cash Details</h2>

        <p>
          <strong>Creating Cash Details:</strong> When users open Financier,
          they are greeted with a simple and user-friendly interface that allows
          them to create new cash details effortlessly. Whether they want to
          record an expense, such as a purchase or bill payment, or log an
          income source like a salary or freelance payment, the process is
          intuitive. Users input the transaction amount, choose a category,
          specify the date, and optionally add a brief description or note to
          provide context.
        </p>

        <p>
          <strong>Updating Cash Details:</strong> Life is dynamic, and so are
          financial transactions. Financier acknowledges this by offering an
          easy method to update cash details. If users made a typo in the
          transaction amount, selected the wrong category, or need to adjust the
          transaction date, they can simply access the specific record and make
          the necessary edits. This flexibility ensures that the financial data
          remains accurate and reflective of real-life financial activities.
        </p>

        <p>
          <strong>Removing Cash Details:</strong> Mistakes happen, and financial
          records should be as error-free as possible. In cases where users need
          to eliminate an incorrect or duplicate entry, Financier provides a
          straightforward method to remove cash details. Users can select the
          transaction they wish to delete, confirm the action, and the entry is
          permanently removed from their records. This feature empowers users to
          maintain a clean and precise financial history.
        </p>

        <h2>Differentiating Expense and Earnings</h2>
        <p>
          Financier goes beyond simple expense tracking by offering the ability
          to differentiate between expenses and earnings with precision. When
          users enter a cash detail, they have the option to specify whether it
          represents an expense or income.
        </p>

        <p>
          <strong>Expense Tracking:</strong> Users can categorize transactions
          as expenses when they spend money. This can include purchases, bills,
          or any other outflows of cash. Financier records and categorizes these
          expenses, allowing users to analyze their spending patterns and
          identify areas where they can cut back or optimize their budget.
        </p>

        <p>
          <strong>Earnings Tracking:</strong> On the flip side, users can
          categorize transactions as earnings when they receive money. This
          could include salary deposits, freelance income, or any other inflow
          of cash. Financier keeps a comprehensive record of these earnings,
          helping users understand their income sources and plan for financial
          growth.
        </p>

        <h2>Saving Cash Details</h2>
        <p>
          Financier prioritizes the security and preservation of users'
          financial data. Every transaction entered into the app is
          automatically saved and securely stored within the user's account.
          This feature ensures several key benefits:
        </p>

        <ul>
          <li>
            <strong>Comprehensive Financial History:</strong> Users can trust
            that their complete financial history is available within the app.
            Whether it's last month's rent payment or a recent paycheck, every
            transaction is stored, providing users with a comprehensive overview
            of their financial journey.
          </li>

          <li>
            <strong>Data Security:</strong> Financier takes data security
            seriously. All financial records are protected using robust
            encryption and security measures, ensuring that sensitive financial
            information is kept confidential.
          </li>

          <li>
            <strong>Backup and Recovery:</strong> In the event of a device
            change or app reinstallation, users can easily recover their
            financial data. Financier offers seamless backup and restore
            functionality to ensure that no financial details are lost.
          </li>

          <li>
            <strong>Historical Analysis:</strong> With a rich history of
            transactions at their fingertips, users can perform historical
            analysis, track spending trends over time, and make informed
            financial decisions based on their past financial behavior.
          </li>
        </ul>
        <footer>&copy; 2023 Financier. All rights reserved.</footer>
      </div>
    </article>
  );
}
