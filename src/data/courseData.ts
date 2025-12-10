export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  notes: string;
  importantPoints: string[];
  quiz: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  moduleTest: QuizQuestion[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  finalExamPassRate: number;
}

export const courseData: Course = {
  id: 'master-the-markets',
  title: 'Investment Master',
  description: 'Comprehensive course from basics to advanced investment strategies',
  finalExamPassRate: 75,
  modules: [
    {
      id: 'module-1',
      title: 'Introduction to Financial Markets',
      description: 'Basics of financial markets and key concepts',
      lessons: [
        {
          id: 'lesson-1-1',
          title: 'What Are Financial Markets',
          duration: '12 min',
          notes: `
# What Are Financial Markets

Financial markets are platforms where financial instruments are exchanged between participants. These include stock exchanges, currency markets, bond markets, and others.

## Main Functions:
- **Capital Redistribution** — directing money where it works more efficiently
- **Price Discovery** — determining fair value of assets
- **Liquidity** — ability to quickly buy or sell an asset

## Why This Matters to You
Understanding how markets work allows you to make informed investment decisions instead of relying on marketing promises from financial intermediaries.

> **Food for Thought:** A bank deposit is also participation in financial markets, but through an intermediary (the bank), which takes a significant portion of returns as its margin.
          `,
          importantPoints: [
            'Financial markets are a mechanism for efficient capital allocation',
            'Direct market participation removes intermediaries and their fees',
            'Understanding markets is the foundation of financial literacy'
          ],
          quiz: [
            {
              id: 'q1-1-1',
              question: 'What is the main function of financial markets?',
              options: ['Only trading stocks', 'Capital redistribution and price discovery', 'Storing money', 'Issuing loans'],
              correctAnswer: 1,
              explanation: 'Financial markets perform many functions, key among which are efficient capital redistribution and determining fair prices for assets.'
            },
            {
              id: 'q1-1-2',
              question: 'What happens to your money when you put it in a deposit?',
              options: ['It just sits in the bank vault', 'The bank invests it and issues loans, taking most of the profit', 'It immediately goes to the exchange', 'Nothing happens'],
              correctAnswer: 1,
              explanation: 'The bank uses deposits to issue loans at higher interest rates. The difference between deposit and loan rates is the bank\'s margin.'
            }
          ]
        },
        {
          id: 'lesson-1-2',
          title: 'Asset Classes: Stocks, Bonds, Commodities',
          duration: '18 min',
          notes: `
# Asset Classes

## Stocks
Equity securities giving the right to a portion of company profits and participation in management.
- Historical returns: 7-10% annually (after inflation)
- Risk: high in short term, moderate in long term

## Bonds
Debt securities — you lend money to the issuer.
- Returns: 2-6% above inflation for corporate bonds
- Risk: lower than stocks, but higher than "risk-free" rate

## Commodities
Gold, oil, agricultural products.
- Inflation hedge (especially gold)
- High volatility

## Bank Deposits — Also an Asset
But with features:
- Returns: often below inflation in real terms
- Risk: low nominally, but **inflation risk** is significant
- Liquidity: limited by contract terms
          `,
          importantPoints: [
            'Stocks historically yield 7-10% annually above inflation',
            'Bonds — balance between risk and return',
            'Deposits often lose to inflation in real terms'
          ],
          quiz: [
            {
              id: 'q1-2-1',
              question: 'Which asset class historically shows the highest returns in the long term?',
              options: ['Bank deposits', 'Bonds', 'Stocks', 'Cash'],
              correctAnswer: 2,
              explanation: 'Stocks historically yield 7-10% annually above inflation, which is significantly higher than other asset classes in the long term.'
            },
            {
              id: 'q1-2-2',
              question: 'What is the inflation risk of a bank deposit?',
              options: ['The bank may go bankrupt', 'Your money\'s purchasing power may decrease', 'Interest rate may change', 'Money may be stolen'],
              correctAnswer: 1,
              explanation: 'Inflation risk is the risk that the real value of your savings will decrease due to rising prices, even if the nominal amount increases.'
            }
          ]
        },
        {
          id: 'lesson-1-3',
          title: 'Nominal vs Real Returns',
          duration: '15 min',
          notes: `
# Nominal vs Real Returns

## Nominal Returns
What you see in ads: "8% annually!", "Best rate on the market!"

## Real Returns
Nominal returns minus inflation. **This is what really matters.**

### Calculation Example:
- Deposit: 8% annually
- Inflation: 6%
- Real return: 8% - 6% = **2%**

Over 10 years under these conditions:
- Nominally your $100,000 becomes ~$215,000
- Real (accounting for inflation): ~$122,000 in today's money

## Why Do Banks Only Talk About Nominal Rates?
Because it looks more attractive. Real returns on deposits are often close to zero or negative.

> **Important:** Always calculate real returns when comparing investment alternatives!
          `,
          importantPoints: [
            'Real Return = Nominal - Inflation',
            'Banks emphasize nominal rates',
            'Real returns on deposits are often close to zero'
          ],
          quiz: [
            {
              id: 'q1-3-1',
              question: 'If a deposit gives 7% and inflation is 5%, what is the real return?',
              options: ['7%', '12%', '2%', '5%'],
              correctAnswer: 2,
              explanation: 'Real return = 7% - 5% = 2%. This is what actually increases your purchasing power.'
            },
            {
              id: 'q1-3-2',
              question: 'Why do banks usually indicate nominal rates in advertising?',
              options: ['The law requires it', 'Nominal rates look more attractive', 'They don\'t know the inflation level', 'Real rates cannot be calculated'],
              correctAnswer: 1,
              explanation: 'Nominal rates always look more attractive than real ones. This is a marketing technique worth paying attention to.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt1-1',
          question: 'What is the main function of financial markets?',
          options: ['Storing money', 'Efficient capital redistribution', 'Printing money', 'Paying salaries'],
          correctAnswer: 1
        },
        {
          id: 'mt1-2',
          question: 'Which asset class has the highest historical returns?',
          options: ['Deposits', 'Bonds', 'Stocks', 'Cash'],
          correctAnswer: 2
        },
        {
          id: 'mt1-3',
          question: 'Real return of a 9% deposit with 7% inflation is:',
          options: ['9%', '16%', '7%', '2%'],
          correctAnswer: 3
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Understanding Real Returns',
      description: 'Deep dive into the concept of real returns and their impact on your savings',
      lessons: [
        {
          id: 'lesson-2-1',
          title: 'Inflation: The Silent Enemy of Savings',
          duration: '14 min',
          notes: `
# Inflation: The Silent Enemy of Savings

Inflation is a sustained increase in the general price level. Every year your money loses purchasing power.

## How Inflation Affects Savings

| Year | Amount on Deposit (8%) | Real Value (6% inflation) |
|------|------------------------|--------------------------|
| 0    | 100,000               | 100,000                  |
| 5    | 146,933               | 109,836                  |
| 10   | 215,892               | 120,642                  |
| 20   | 466,096               | 145,545                  |

**Conclusion:** Over 20 years, nominally you "earned" 366,000, but really — only 45,545 in today's money.

## Why This Matters
Many people choose "safe" deposits without understanding that inflation risk is also a risk. It just doesn't manifest as a sharp drop in account numbers, but as a gradual loss of purchasing power.
          `,
          importantPoints: [
            'Inflation constantly devalues your savings',
            'Over 20 years, real deposit returns can be 8 times less than nominal',
            'Inflation risk is often underestimated'
          ],
          quiz: [
            {
              id: 'q2-1-1',
              question: 'What happens to money\'s purchasing power during inflation?',
              options: ['Increases', 'Remains unchanged', 'Decreases', 'Depends on the bank'],
              correctAnswer: 2,
              explanation: 'Inflation means rising prices, so with the same amount of money you can buy fewer goods and services.'
            }
          ]
        },
        {
          id: 'lesson-2-2',
          title: 'Comparison: Deposits vs Investment Instruments',
          duration: '20 min',
          notes: `
# Comparison: Deposits vs Investment Instruments

## Historical Returns (Real, After Inflation)

| Instrument | Returns | Risk | Liquidity |
|------------|---------|------|-----------|
| Deposits | 0-2% | Low* | Medium** |
| Government Bonds | 1-3% | Low | High |
| Corporate Bonds | 2-5% | Medium | High |
| Stock ETFs | 5-8% | High*** | High |
| Stocks | 7-10% | Very High | High |

*Low nominally, but inflation risk is significant
**Early withdrawal often cancels interest
***In short term; in long term (10+ years) risk decreases

## Key Takeaway
With an investment horizon of 10+ years, a diversified ETF portfolio has a high probability of outperforming deposits in real returns.
          `,
          importantPoints: [
            'Deposits give 0-2% real returns',
            'Stock ETFs historically yield 5-8% real returns',
            'Long-term horizon reduces risks of investing in stocks'
          ],
          quiz: [
            {
              id: 'q2-2-1',
              question: 'What is the typical real return of bank deposits?',
              options: ['8-10%', '5-7%', '0-2%', '10-15%'],
              correctAnswer: 2,
              explanation: 'After deducting inflation, deposits usually yield 0-2% real returns, sometimes even negative.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt2-1',
          question: 'Which instrument historically shows the highest real returns?',
          options: ['Bank deposits', 'Cash', 'Stock ETFs', 'Currency under the mattress'],
          correctAnswer: 2
        },
        {
          id: 'mt2-2',
          question: '6% inflation means that in a year, with 100,000 you can buy goods worth approximately:',
          options: ['106,000', '100,000', '94,340', '90,000'],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 'module-3',
      title: 'Building an Investment Portfolio',
      description: 'Practical principles of creating and managing a portfolio',
      lessons: [
        {
          id: 'lesson-3-1',
          title: 'Diversification Principles',
          duration: '16 min',
          notes: `
# Diversification Principles

"Don't put all your eggs in one basket" — a basic investment principle.

## Types of Diversification:
1. **By Asset Classes** — stocks, bonds, commodities
2. **By Geography** — different countries and regions
3. **By Sectors** — technology, finance, healthcare
4. **By Currencies** — dollars, euros, etc.

## Why Diversification Works
Different assets react to economic events differently. When some fall, others may rise or remain stable.

## Diversification vs Concentration
A bank deposit is concentration in one type of asset with low real returns. A diversified portfolio distributes risks and increases potential returns.
          `,
          importantPoints: [
            'Diversification reduces risk without significant loss of returns',
            'It\'s important to diversify by asset classes, geography, and sectors',
            'A deposit is concentration, not diversification'
          ],
          quiz: [
            {
              id: 'q3-1-1',
              question: 'What is NOT a type of diversification?',
              options: ['By asset classes', 'By geography', 'Placing all money in one bank', 'By economic sectors'],
              correctAnswer: 2,
              explanation: 'Placing all money in one bank is concentration, not diversification. Even deposit insurance doesn\'t protect against inflation risk.'
            }
          ]
        },
        {
          id: 'lesson-3-2',
          title: 'Asset Allocation by Age and Goals',
          duration: '18 min',
          notes: `
# Asset Allocation by Age and Goals

## Classic "100 Minus Age" Rule
Percentage of stocks in portfolio = 100 - your age

- Age 25 → 75% stocks, 25% bonds
- Age 40 → 60% stocks, 40% bonds
- Age 60 → 40% stocks, 60% bonds

## Why Young People Can Take More Risk
1. More time to recover from drawdowns
2. Main income from work, independent of portfolio
3. Compound interest effect works stronger over long horizon

## Young Investor Mistake
Many young people keep money in deposits "for safety", missing years of potential growth in the stock market.
          `,
          importantPoints: [
            'Young investors can afford more stocks in portfolio',
            'Bond allocation should increase with age',
            'Time is the investor\'s main ally in stocks'
          ],
          quiz: [
            {
              id: 'q3-2-1',
              question: 'What asset allocation is recommended for a 30-year-old investor by the "100 minus age" rule?',
              options: ['30% stocks, 70% bonds', '70% stocks, 30% bonds', '50% stocks, 50% bonds', '100% deposits'],
              correctAnswer: 1,
              explanation: '100 - 30 = 70, meaning 70% stocks and 30% bonds. This is an aggressive but suitable portfolio for a young investor with a long horizon.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt3-1',
          question: 'What is diversification?',
          options: ['Investing all money in one company\'s stock', 'Distributing investments among different assets', 'Keeping money in deposits', 'Buying real estate'],
          correctAnswer: 1
        },
        {
          id: 'mt3-2',
          question: 'By the "100 minus age" rule, what percentage of stocks should be in a 45-year-old investor\'s portfolio?',
          options: ['45%', '55%', '100%', '0%'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-4',
      title: 'Practical Instruments',
      description: 'ETFs, bonds, and other instruments for independent investing',
      lessons: [
        {
          id: 'lesson-4-1',
          title: 'ETF: A Simple Way to Invest',
          duration: '22 min',
          notes: `
# ETF: A Simple Way to Invest

ETF (Exchange Traded Fund) is a fund whose shares trade on an exchange.

## ETF Advantages:
1. **Diversification** — one ETF can contain hundreds of stocks
2. **Low Fees** — 0.03-0.5% annually vs 1-3% for bank products
3. **Liquidity** — can buy/sell at any time
4. **Transparency** — fund composition is known

## Examples of Popular ETFs:
- **S&P 500 ETF** — 500 largest US companies
- **World ETF** — stocks of companies worldwide
- **Bond ETF** — diversified bond portfolio

## ETF vs Bank Investment Products
| Criterion | ETF | Bank Product |
|-----------|-----|--------------|
| Fee | 0.03-0.5% | 1-3% |
| Transparency | Full | Partial |
| Liquidity | Instant | Limited |
| Control | Full | Through manager |
          `,
          importantPoints: [
            'ETF is a simple way to get diversification',
            'ETF fees are 10-100 times lower than bank products',
            'ETF can be bought/sold at any time without losing income'
          ],
          quiz: [
            {
              id: 'q4-1-1',
              question: 'What advantage do ETFs have over bank investment products?',
              options: ['Guaranteed returns', 'Lower fees and transparency', 'Deposit insurance', 'Ability to get loans'],
              correctAnswer: 1,
              explanation: 'ETFs have significantly lower fees (0.03-0.5% vs 1-3%) and full transparency of composition.'
            }
          ]
        },
        {
          id: 'lesson-4-2',
          title: 'How to Open a Brokerage Account',
          duration: '15 min',
          notes: `
# How to Open a Brokerage Account

## Steps:
1. **Choose a broker** — compare fees, convenience, reliability
2. **Submit application** — online or in office
3. **Complete identification** — upload documents
4. **Fund account** — transfer money
5. **Start investing** — buy first assets

## What to Pay Attention To:
- Trading fees
- Custody fees
- Minimum amount
- Available markets and instruments
- Support quality

## The Complexity Myth
Opening a brokerage account today is no more difficult than opening a bank account. Many are afraid to start, although the process takes 15-30 minutes.
          `,
          importantPoints: [
            'Opening a brokerage account is as simple as a bank account',
            'Compare brokers by fees and convenience',
            'Don\'t delay — time works for the investor'
          ],
          quiz: [
            {
              id: 'q4-2-1',
              question: 'How long does opening a brokerage account usually take?',
              options: ['Several days', '15-30 minutes', 'Several months', 'Cannot be opened independently'],
              correctAnswer: 1,
              explanation: 'Modern brokers allow opening an account online in 15-30 minutes. It\'s no more difficult than opening a bank account.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt4-1',
          question: 'What is the typical ETF fee?',
          options: ['5-10%', '1-3%', '0.03-0.5%', 'ETFs have no fees'],
          correctAnswer: 2
        },
        {
          id: 'mt4-2',
          question: 'Opening a brokerage account usually takes:',
          options: ['Several months', '15-30 minutes', 'Requires visiting tax office', 'Impossible for individuals'],
          correctAnswer: 1
        }
      ]
    }
  ]
};

export const finalExamQuestions: QuizQuestion[] = [
  {
    id: 'fe-1',
    question: 'What is the formula for real returns?',
    options: ['Nominal + Inflation', 'Nominal - Inflation', 'Nominal × Inflation', 'Inflation - Nominal'],
    correctAnswer: 1,
    explanation: 'Real Return = Nominal Return - Inflation'
  },
  {
    id: 'fe-2',
    question: 'Which asset class historically shows the highest real returns?',
    options: ['Bank deposits', 'Cash', 'Stocks', 'Gold'],
    correctAnswer: 2,
    explanation: 'Stocks historically yield 7-10% real returns in the long term.'
  },
  {
    id: 'fe-3',
    question: 'What is diversification?',
    options: ['Investing all funds in one asset', 'Distributing investments among different assets', 'Keeping money in bank', 'Buying only bonds'],
    correctAnswer: 1
  },
  {
    id: 'fe-4',
    question: 'What is the typical ETF fee compared to bank investment products?',
    options: ['The same', '10-100 times lower', '2 times higher', 'ETFs have no fees'],
    correctAnswer: 1
  },
  {
    id: 'fe-5',
    question: 'By the "100 minus age" rule, what percentage of stocks is recommended for a 35-year-old investor?',
    options: ['35%', '65%', '100%', '50%'],
    correctAnswer: 1
  },
  {
    id: 'fe-6',
    question: 'What is the inflation risk of a bank deposit?',
    options: ['Risk of bank bankruptcy', 'Risk of losing purchasing power due to inflation', 'Risk of rate change', 'Risk of account blocking'],
    correctAnswer: 1
  },
  {
    id: 'fe-7',
    question: 'What liquidity advantage do ETFs have compared to deposits?',
    options: ['ETFs cannot be sold', 'ETFs can be sold instantly without losing accumulated income', 'Same liquidity', 'Deposits are more liquid'],
    correctAnswer: 1
  },
  {
    id: 'fe-8',
    question: 'How do banks earn on deposits?',
    options: ['Store money in vault', 'Issue loans at higher interest rates', 'Invest in gold', 'Don\'t earn on deposits'],
    correctAnswer: 1
  },
  {
    id: 'fe-9',
    question: 'What investment horizon reduces risks of investing in stocks?',
    options: ['1 month', '1 year', '10+ years', 'Horizon doesn\'t affect risks'],
    correctAnswer: 2
  },
  {
    id: 'fe-10',
    question: 'Real return of a 10% deposit with 8% inflation is:',
    options: ['10%', '18%', '2%', '8%'],
    correctAnswer: 2
  }
];
