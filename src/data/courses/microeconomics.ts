import type {
  Course,
  Unit,
  Lesson,
  VideoContent,
  ArticleContent,
  PracticeContent,
  QuizContent,
} from '../courseTypes';

const unit1Lessons: Lesson[] = [
  {
    id: 'lesson-1-1',
    title: 'Introduction to economics',
    duration: '30 min',
    contentItems: [
      {
        id: 'micro-u1-l1-video-1',
        type: 'video',
        title: 'Introduction to economics',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u1-l1-article',
        type: 'article',
        title: 'Learn: Introduction to economics',
        content: `# Introduction to economics

## Introduction to economics

**Economics** is the study of how individuals and societies make choices about allocating scarce resources to satisfy unlimited wants.

**Key questions economics addresses**:
- What to produce?
- How to produce?
- For whom to produce?

**Two main branches**:
- **Microeconomics**: Study of individual economic units (households, firms, markets)
- **Macroeconomics**: Study of economy-wide phenomena (GDP, inflation, unemployment)

**Core principle**: People face trade-offs and make rational choices.

## Scarcity

**Scarcity** is the fundamental economic problem: unlimited wants but limited resources.

**Key characteristics**:
- Resources are limited (finite)
- Wants are unlimited (infinite)
- Forces us to make choices
- Exists in all societies, regardless of wealth

**Not the same as poverty**:
- Scarcity exists even in wealthy societies
- Even with abundance, choices must be made
- Time, attention, and other resources are always scarce

**Implications**:
- Every choice has an opportunity cost
- We cannot have everything we want
- Must prioritize and make trade-offs

## Scarcity and rivalry

**Rivalry** (rival goods): When one person's consumption prevents another's consumption.

**Examples of rival goods**:
- Food (if I eat it, you can't)
- Gasoline (if I use it, you can't)
- Seats in a theater (if I sit there, you can't)

**Non-rival goods**: One person's consumption doesn't prevent another's.
- Examples: Radio broadcast, public park, knowledge

**Scarcity and rivalry relationship**:
- Scarcity creates rivalry
- Limited resources mean competition for them
- Rivalry is a consequence of scarcity

**Economic significance**: Rival goods typically require markets or allocation mechanisms.

## Four factors of production

**Factors of production** are resources used to produce goods and services:

1. **Land**: Natural resources
   - Examples: Land, water, minerals, forests
   - Payment: Rent

2. **Labor**: Human effort (physical and mental)
   - Examples: Workers, skills, knowledge
   - Payment: Wages

3. **Capital**: Manufactured goods used to produce other goods
   - Examples: Machinery, tools, buildings, equipment
   - Payment: Interest
   - Note: Financial capital (money) is not a factor of production

4. **Entrepreneurship**: Ability to organize and take risks
   - Examples: Innovation, business organization, risk-taking
   - Payment: Profit

**Key insight**: All production requires these four factors in some combination.

## Economic models

**Economic models** are simplified representations of reality used to understand economic behavior.

**Purpose**:
- Simplify complex reality
- Focus on key relationships
- Make predictions
- Test theories

**Characteristics of good models**:
- Simple but not too simple
- Based on assumptions
- Testable
- Useful for predictions

**Common assumptions**:
- Rational behavior
- Self-interest
- Ceteris paribus (other things equal)

**Limitations**:
- Models are simplifications
- May not capture all reality
- Assumptions may not always hold

**Key insight**: Models help us understand, but we must remember they are simplifications.

## Normative and positive statements

**Positive statements**:
- Describe what is (facts)
- Can be tested with data
- Objective
- Examples:
  - "Unemployment is 5%"
  - "Raising taxes reduces consumption"
  - "The minimum wage is $15 per hour"

**Normative statements**:
- Describe what should be (value judgments)
- Cannot be tested with data
- Subjective (involves values)
- Examples:
  - "Unemployment should be lower"
  - "Taxes should be raised"
  - "The minimum wage should be $20 per hour"

**Key distinction**: Positive = "is" (factual), Normative = "should" (value judgment)

**Importance**: Economists try to focus on positive analysis, but policy often involves normative judgments.

## Lesson summary: Scarcity, choice, and opportunity costs

Economics studies how societies allocate scarce resources. Scarcity forces choices. Every choice has an opportunity cost (the value of the next best alternative). Production requires four factors: land, labor, capital, and entrepreneurship. Economic models simplify reality to help us understand. Positive statements describe facts; normative statements express value judgments. Understanding scarcity and opportunity costs is fundamental to economic thinking.`,
        importantPoints: [
          'Economics studies allocation of scarce resources',
          'Scarcity forces choices and creates opportunity costs',
          'Four factors of production: land, labor, capital, entrepreneurship',
          'Economic models simplify reality to aid understanding',
          'Positive statements are factual; normative statements are value judgments',
        ],
      } as ArticleContent,
      {
        id: 'micro-u1-l1-practice',
        type: 'practice',
        title: 'Practice: Scarcity',
        exercises: [
          {
            id: 'practice-1-1-1',
            prompt: 'Explain why scarcity exists even in wealthy societies. Give examples of scarce resources in a rich country.',
            hints: [
              'Scarcity is about limited resources vs. unlimited wants',
              'Time is always scarce',
              'Even abundant resources require choices',
            ],
          },
          {
            id: 'practice-1-1-2',
            prompt: 'Identify the four factors of production used to produce a smartphone. For each factor, explain its role and what payment it receives.',
            hints: [
              'Land: raw materials (minerals, rare earth elements)',
              'Labor: workers who assemble and design',
              'Capital: factories, machinery, equipment',
              'Entrepreneurship: innovation and organization',
            ],
          },
          {
            id: 'practice-1-1-3',
            prompt: 'Classify each statement as positive or normative: (a) "The unemployment rate is 6%", (b) "The government should create more jobs", (c) "Raising the minimum wage increases unemployment".',
            hints: [
              'Positive: describes what is (can be tested)',
              'Normative: describes what should be (value judgment)',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'micro-u1-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Introduction to economics',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-1-2',
    title: 'Economic systems',
    duration: '30 min',
    contentItems: [
      {
        id: 'micro-u1-l2-video-1',
        type: 'video',
        title: 'Economic systems',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u1-l2-article',
        type: 'article',
        title: 'Learn: Economic systems',
        content: `# Economic systems

## Property rights in a market system

**Property rights** define who owns resources and how they can be used.

**Key characteristics**:
- **Exclusivity**: Owner can exclude others from using the resource
- **Transferability**: Owner can sell or transfer the resource
- **Enforceability**: Rights are protected by law

**Importance in market systems**:
- Provides incentives to invest and maintain resources
- Enables voluntary exchange
- Reduces conflict over resources
- Encourages efficient use

**Types of property**:
- **Private property**: Owned by individuals or firms
- **Public property**: Owned by government
- **Common property**: Owned collectively (can lead to "tragedy of the commons")

**Market system requirement**: Strong property rights are essential for markets to function.

## Markets and property rights, the role of incentives, and the circular flow model

**Markets** are institutions where buyers and sellers exchange goods and services.

**How markets work**:
- Buyers and sellers interact voluntarily
- Prices coordinate decisions
- Property rights enable exchange
- Competition promotes efficiency

**Role of incentives**:
- **Self-interest**: People respond to incentives
- **Prices**: Signal scarcity and value
- **Profits**: Reward successful production
- **Losses**: Punish inefficient production

**Incentives in market system**:
- Profit motive drives innovation
- Competition encourages efficiency
- Prices guide resource allocation
- Property rights protect investments

**Circular flow model** shows how resources, goods, and money flow through the economy:

**Two main flows**:
1. **Real flow**: Resources and goods/services
   - Households supply resources (labor, land, capital) to firms
   - Firms supply goods/services to households

2. **Money flow**: Payments
   - Firms pay households for resources (wages, rent, interest)
   - Households pay firms for goods/services

**Two main sectors**:
- **Households**: Own resources, consume goods/services
- **Firms**: Use resources to produce goods/services

**Key insight**: Markets coordinate these flows through prices and voluntary exchange.

## Lesson overview: Economic systems, the role of incentives, and the circular flow model

**Types of economic systems**:

1. **Market economy** (capitalism):
   - Decisions made by individuals and firms
   - Prices determined by supply and demand
   - Private property rights
   - Minimal government intervention
   - Examples: US, UK (mostly)

2. **Command economy** (socialism/communism):
   - Decisions made by government
   - Central planning
   - Public ownership
   - Government controls prices and production
   - Examples: North Korea, Cuba (historically)

3. **Mixed economy**:
   - Combination of market and command
   - Private markets with government regulation
   - Most modern economies
   - Examples: Most countries today

**Role of incentives**:
- Market systems rely on self-interest and profit motive
- Command systems rely on central planning and directives
- Incentives affect efficiency and innovation

**Circular flow**:
- Shows interdependence of households and firms
- Demonstrates how markets coordinate economic activity
- Illustrates resource allocation and income distribution

**Key insight**: Economic systems differ in how they answer the three economic questions (what, how, for whom) and how they use incentives to coordinate economic activity.`,
        importantPoints: [
          'Property rights are essential for market systems',
          'Markets coordinate economic activity through prices',
          'Incentives (self-interest, profits) drive market behavior',
          'Circular flow model shows resource and money flows',
          'Economic systems differ in how they allocate resources',
        ],
      } as ArticleContent,
      {
        id: 'micro-u1-l2-practice',
        type: 'practice',
        title: 'Practice: Resource allocation and economic systems',
        exercises: [
          {
            id: 'practice-1-2-1',
            prompt: 'Explain why property rights are essential for a market system to function. What happens when property rights are weak?',
            hints: [
              'Property rights enable voluntary exchange',
              'Provide incentives to invest',
              'Weak rights lead to conflict and inefficiency',
            ],
          },
          {
            id: 'practice-1-2-2',
            prompt: 'Draw and explain the circular flow model. Show both the real flow and the money flow between households and firms.',
            hints: [
              'Real flow: resources and goods/services',
              'Money flow: payments',
              'Households supply resources, demand goods',
              'Firms demand resources, supply goods',
            ],
          },
          {
            id: 'practice-1-2-3',
            prompt: 'Compare and contrast a market economy and a command economy. How do they differ in answering the three economic questions?',
            hints: [
              'Market: individuals decide, prices coordinate',
              'Command: government decides, central planning',
              'Different use of incentives',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'micro-u1-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Economic systems',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit2Lessons: Lesson[] = [
  {
    id: 'lesson-2-1',
    title: 'Demand',
    duration: '35 min',
    contentItems: [
      {
        id: 'micro-u2-l1-video-1',
        type: 'video',
        title: 'Demand',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u2-l1-article',
        type: 'article',
        title: 'Learn: Demand',
        content: `# Demand

## Law of demand

**Law of demand**: As the price of a good increases, the quantity demanded decreases (ceteris paribus - all else equal).

**Key relationship**: Price and quantity demanded are inversely related.

**Demand schedule**: Table showing quantity demanded at different prices.

**Demand curve**: Graph showing the relationship between price and quantity demanded.
- Downward sloping
- Y-axis: Price
- X-axis: Quantity demanded

**Why demand curves slope downward**:
- Substitution effect
- Income effect
- Diminishing marginal utility

## Market demand as the sum of individual demand

**Individual demand**: One person's demand for a good at different prices.

**Market demand**: Sum of all individual demands in the market.

**How to find market demand**:
- At each price, add up quantities demanded by all individuals
- Market demand = Σ Individual demands

**Example**:
- At $10: Person A wants 2 units, Person B wants 3 units
- Market demand at $10 = 2 + 3 = 5 units

**Key insight**: Market demand shows total quantity all consumers are willing and able to buy at each price.

## Substitution and income effects and the law of demand

**Substitution effect**: When price rises, consumers substitute toward relatively cheaper alternatives.

**Example**: If coffee price rises, consumers buy more tea (substitute).

**Income effect**: When price rises, consumers' purchasing power decreases (real income falls), so they buy less.

**Example**: If coffee price rises, consumers feel poorer and buy less coffee.

**Both effects work together**:
- Price increase → Substitution effect (buy less, substitute away)
- Price increase → Income effect (feel poorer, buy less)
- Both reduce quantity demanded

**Key insight**: Substitution and income effects explain why demand curves slope downward.

## Price of related products and demand

**Related products** affect demand:

**Substitutes**: Products that can be used in place of each other.
- If price of substitute increases → Demand for original good increases
- Example: If tea price rises, coffee demand increases

**Complements**: Products used together.
- If price of complement increases → Demand for original good decreases
- Example: If peanut butter price rises, jelly demand decreases

**Unrelated goods**: No effect on each other's demand.

**Key insight**: Changes in prices of related goods shift the demand curve (change in demand), not movement along the curve.

## Change in expected future prices and demand

**Expected future prices** affect current demand:

**If price expected to rise**:
- Consumers buy more now (before price increase)
- Current demand increases
- Demand curve shifts right

**If price expected to fall**:
- Consumers buy less now (wait for lower price)
- Current demand decreases
- Demand curve shifts left

**Examples**:
- Expected gas price increase → Buy more gas now
- Expected sale next week → Wait to buy

**Key insight**: Expectations about future prices shift current demand.

## Changes in income, population, or preferences

**Income changes**:
- **Normal goods**: Higher income → Higher demand
  - Example: Restaurants, vacations, cars
- **Inferior goods**: Higher income → Lower demand
  - Example: Generic brands, public transportation (for some)

**Population changes**:
- More people → More demand (at each price)
- Demand curve shifts right
- Fewer people → Less demand
- Demand curve shifts left

**Preferences (tastes) changes**:
- More favorable preferences → Higher demand
- Demand curve shifts right
- Less favorable preferences → Lower demand
- Demand curve shifts left

**Examples**:
- Health trend → Higher demand for organic food
- Fashion change → Lower demand for old styles

## Normal and inferior goods

**Normal goods**: Demand increases when income increases.

**Characteristics**:
- Positive income elasticity
- Most goods are normal goods
- Examples: Cars, housing, restaurant meals, vacations

**Inferior goods**: Demand decreases when income increases.

**Characteristics**:
- Negative income elasticity
- Consumers switch to better alternatives when income rises
- Examples: Generic brands, ramen noodles, used cars (for some), public transportation (for some)

**Key insight**: Whether a good is normal or inferior depends on consumer income level and preferences.

## Inferior goods clarification

**Important points about inferior goods**:

1. **Not about quality**: Inferior doesn't mean low quality
   - It means demand decreases when income rises
   - Consumers prefer alternatives when they can afford them

2. **Income-dependent**: A good can be inferior for some people but normal for others
   - Example: Public transportation may be inferior for high-income earners but normal for low-income earners

3. **Relative concept**: Depends on income level
   - At very low income: May be normal (only option)
   - At higher income: Becomes inferior (better alternatives available)

4. **Examples**:
   - Generic brands (switch to name brands when income rises)
   - Fast food (switch to restaurants when income rises)
   - Used goods (switch to new when income rises)

## What factors change demand?

**Factors that shift the demand curve** (change in demand):

1. **Income** (for normal goods: ↑ income → ↑ demand)
2. **Prices of related goods** (substitutes, complements)
3. **Tastes and preferences**
4. **Population** (more people → more demand)
5. **Expected future prices**
6. **Expected future income**

**Important distinction**:
- **Change in demand**: Shift of entire curve (due to factors above)
- **Change in quantity demanded**: Movement along curve (due to price change only)

**Key insight**: Only price changes cause movement along the demand curve. All other factors shift the curve.

## Lesson summary: Demand and the determinants of demand

The law of demand states that price and quantity demanded are inversely related. Market demand is the sum of individual demands. Substitution and income effects explain the downward slope. Factors that shift demand include income, prices of related goods, tastes, population, and expectations. Normal goods have positive income elasticity; inferior goods have negative income elasticity. Understanding the difference between a change in demand (shift) and a change in quantity demanded (movement) is crucial.`,
        importantPoints: [
          'Law of demand: Price and quantity demanded are inversely related',
          'Market demand is the sum of all individual demands',
          'Substitution and income effects explain downward-sloping demand',
          'Factors that shift demand: income, related goods, tastes, population, expectations',
          'Normal goods: demand increases with income; inferior goods: demand decreases',
        ],
      } as ArticleContent,
      {
        id: 'micro-u2-l1-practice',
        type: 'practice',
        title: 'Practice: Demand and the law of demand',
        exercises: [
          {
            id: 'practice-2-1-1',
            prompt: 'Explain the law of demand. Why do demand curves slope downward? Use both substitution and income effects in your explanation.',
            hints: [
              'Price and quantity are inversely related',
              'Substitution effect: switch to alternatives',
              'Income effect: purchasing power changes',
            ],
          },
          {
            id: 'practice-2-1-2',
            prompt: 'If the price of coffee increases, what happens to the demand for tea? What happens to the demand for coffee? Explain the difference.',
            hints: [
              'Tea is a substitute for coffee',
              'Demand for tea increases (shift)',
              'Quantity demanded of coffee decreases (movement along curve)',
            ],
          },
          {
            id: 'practice-2-1-3',
            prompt: 'Classify each good as normal or inferior and explain: (a) Restaurant meals, (b) Generic brand cereal, (c) Public transportation for a high-income earner.',
            hints: [
              'Normal: demand increases with income',
              'Inferior: demand decreases with income',
              'Depends on income level and preferences',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'micro-u2-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Demand',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-2-2',
    title: 'Supply',
    duration: '30 min',
    contentItems: [
      {
        id: 'micro-u2-l2-video-1',
        type: 'video',
        title: 'Supply',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u2-l2-article',
        type: 'article',
        title: 'Learn: Supply',
        content: `# Supply

## Law of supply

**Law of supply**: As the price of a good increases, the quantity supplied increases (ceteris paribus - all else equal).

**Key relationship**: Price and quantity supplied are directly (positively) related.

**Supply schedule**: Table showing quantity supplied at different prices.

**Supply curve**: Graph showing the relationship between price and quantity supplied.
- Upward sloping
- Y-axis: Price
- X-axis: Quantity supplied

**Why supply curves slope upward**:
- Higher prices → Higher profits → More incentive to produce
- Higher prices → Can cover higher costs of production
- Law of increasing opportunity cost (producing more requires giving up more)

## Change in supply versus change in quantity supplied

**Change in quantity supplied**:
- Movement along the supply curve
- Caused ONLY by a change in price
- Same supply curve, different point

**Change in supply**:
- Shift of the entire supply curve
- Caused by factors other than price
- New supply curve

**Graphical representation**:
- Movement along curve: Price change → Point moves along same curve
- Shift of curve: Other factors change → Entire curve shifts

**Key insight**: Price changes cause movement along the supply curve. All other factors shift the curve.

## Factors affecting supply

**Factors that shift the supply curve** (change in supply):

1. **Input prices** (costs of production):
   - Higher input prices → Lower supply (shift left)
   - Lower input prices → Higher supply (shift right)
   - Example: If wages rise, supply decreases

2. **Technology**:
   - Better technology → Lower costs → Higher supply (shift right)
   - Example: Improved machinery increases production

3. **Number of sellers**:
   - More sellers → Higher supply (shift right)
   - Fewer sellers → Lower supply (shift left)

4. **Expectations**:
   - Expected higher future prices → Lower current supply (wait to sell)
   - Expected lower future prices → Higher current supply (sell now)

5. **Government policies**:
   - Taxes: Higher taxes → Lower supply (shift left)
   - Subsidies: Subsidies → Higher supply (shift right)
   - Regulations: Can increase or decrease supply

6. **Prices of related goods**:
   - If price of alternative good rises → Supply of original good decreases (shift left)
   - Example: If corn price rises, farmers grow less soybeans

## What factors change supply?

**Summary of supply shifters**:

**Increase supply** (shift right):
- Lower input prices
- Better technology
- More sellers
- Subsidies
- Lower taxes
- Lower expected future prices

**Decrease supply** (shift left):
- Higher input prices
- Fewer sellers
- Higher taxes
- Higher expected future prices
- Higher prices of alternative goods

**Important**: Only these factors shift supply. Price changes cause movement along the supply curve.

## Lesson summary: Supply and its determinants

The law of supply states that price and quantity supplied are directly related. Supply curves slope upward because higher prices provide incentives to produce more. Factors that shift supply include input prices, technology, number of sellers, expectations, government policies, and prices of related goods. Understanding the difference between a change in supply (shift) and a change in quantity supplied (movement) is crucial for analyzing markets.`,
        importantPoints: [
          'Law of supply: Price and quantity supplied are directly related',
          'Supply curves slope upward due to profit incentives',
          'Factors that shift supply: input prices, technology, number of sellers, expectations, policies',
          'Change in supply = shift of curve; change in quantity supplied = movement along curve',
        ],
      } as ArticleContent,
      {
        id: 'micro-u2-l2-practice',
        type: 'practice',
        title: 'Practice: Supply and the law of supply',
        exercises: [
          {
            id: 'practice-2-2-1',
            prompt: 'Explain the law of supply. Why do supply curves slope upward?',
            hints: [
              'Price and quantity are directly related',
              'Higher prices provide profit incentives',
              'Can cover higher production costs',
            ],
          },
          {
            id: 'practice-2-2-2',
            prompt: 'Distinguish between a change in supply and a change in quantity supplied. Give an example of each.',
            hints: [
              'Change in supply: shift of entire curve',
              'Change in quantity supplied: movement along curve',
              'Only price causes movement along curve',
            ],
          },
          {
            id: 'practice-2-2-3',
            prompt: 'Show on a supply-demand diagram what happens when the price of inputs (e.g., wages) increases. Explain the effect on supply.',
            hints: [
              'Higher input prices increase costs',
              'Supply curve shifts left',
              'Less quantity supplied at each price',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'micro-u2-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Supply',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-2-3',
    title: 'Market equilibrium and changes in equilibrium',
    duration: '40 min',
    contentItems: [
      {
        id: 'micro-u2-l3-video-1',
        type: 'video',
        title: 'Market equilibrium and changes in equilibrium',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u2-l3-article',
        type: 'article',
        title: 'Learn: Market equilibrium and changes in equilibrium',
        content: `# Market equilibrium and changes in equilibrium

## Market equilibrium

**Market equilibrium**: The point where quantity demanded equals quantity supplied.

**Equilibrium price**: The price at which quantity demanded = quantity supplied.

**Equilibrium quantity**: The quantity bought and sold at the equilibrium price.

**Graphical representation**:
- Intersection of demand and supply curves
- At equilibrium: Qd = Qs

**Market forces at equilibrium**:
- No shortage (excess demand)
- No surplus (excess supply)
- No pressure for price to change
- Market clears (all willing buyers and sellers can trade)

**Disequilibrium**:
- **Shortage** (excess demand): Qd > Qs at current price
  - Price below equilibrium
  - Upward pressure on price
- **Surplus** (excess supply): Qs > Qd at current price
  - Price above equilibrium
  - Downward pressure on price

## Changes in market equilibrium

**Equilibrium changes when**:
- Demand shifts (curve shifts)
- Supply shifts (curve shifts)
- Both shift simultaneously

**Key principle**: When a curve shifts, equilibrium moves to a new intersection point.

**Effects on equilibrium**:
- New equilibrium price
- New equilibrium quantity
- Direction depends on which curve shifts and in which direction

## Changes in equilibrium price and quantity when supply and demand change

**Single shift analysis**:

**Demand increases** (shifts right):
- Equilibrium price: Increases
- Equilibrium quantity: Increases

**Demand decreases** (shifts left):
- Equilibrium price: Decreases
- Equilibrium quantity: Decreases

**Supply increases** (shifts right):
- Equilibrium price: Decreases
- Equilibrium quantity: Increases

**Supply decreases** (shifts left):
- Equilibrium price: Increases
- Equilibrium quantity: Decreases

**Key insight**: When only one curve shifts, both price and quantity change in predictable ways.

## Changes in equilibrium price and quantity: the four-step process

**Step 1: Determine which curve(s) shift**
- Identify the factor causing the change
- Determine if it affects demand, supply, or both

**Step 2: Determine direction of shift**
- Does demand/supply increase (shift right) or decrease (shift left)?

**Step 3: Find new equilibrium**
- Locate new intersection point
- Identify new equilibrium price and quantity

**Step 4: Compare old and new equilibrium**
- How did price change? (increase, decrease, or ambiguous)
- How did quantity change? (increase, decrease, or ambiguous)

**Example**: Technology improves (lowers production costs)
1. Affects supply (not demand)
2. Supply increases (shifts right)
3. New equilibrium: Lower price, higher quantity
4. Price decreases, quantity increases

**When both curves shift**:
- If both shift in same direction for quantity: Quantity change is clear
- If both shift in opposite directions for price: Price change may be ambiguous
- Need to determine relative magnitudes of shifts

## Lesson summary: Market equilibrium, disequilibrium, and changes in equilibrium

Market equilibrium occurs where quantity demanded equals quantity supplied. At equilibrium, the market clears with no shortage or surplus. Disequilibrium creates market forces that push price toward equilibrium. When demand or supply shifts, equilibrium price and quantity change. The four-step process helps analyze these changes systematically. Understanding equilibrium and how it changes is fundamental to understanding how markets work.`,
        importantPoints: [
          'Equilibrium: quantity demanded = quantity supplied',
          'Shortage: Qd > Qs (price below equilibrium)',
          'Surplus: Qs > Qd (price above equilibrium)',
          'Demand increase → Higher price and quantity',
          'Supply increase → Lower price, higher quantity',
        ],
      } as ArticleContent,
      {
        id: 'micro-u2-l3-practice',
        type: 'practice',
        title: 'Practice: Market equilibrium and disequilibrium, Changes in equilibrium',
        exercises: [
          {
            id: 'practice-2-3-1',
            prompt: 'Define market equilibrium. What happens when the market is not in equilibrium? Explain shortages and surpluses.',
            hints: [
              'Equilibrium: Qd = Qs',
              'Shortage: Qd > Qs, price below equilibrium',
              'Surplus: Qs > Qd, price above equilibrium',
            ],
          },
          {
            id: 'practice-2-3-2',
            prompt: 'Use the four-step process to analyze what happens to equilibrium price and quantity when consumer income increases (assume a normal good).',
            hints: [
              'Step 1: Affects demand',
              'Step 2: Demand increases (shifts right)',
              'Step 3: New equilibrium at higher price and quantity',
              'Step 4: Both price and quantity increase',
            ],
          },
          {
            id: 'practice-2-3-3',
            prompt: 'What happens to equilibrium price and quantity when both demand and supply increase? Explain why the effect on price may be ambiguous.',
            hints: [
              'Both shifts increase quantity (clear)',
              'Demand increase raises price, supply increase lowers price',
              'Net effect on price depends on relative magnitudes',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'micro-u2-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Market equilibrium and changes in equilibrium',
        questions: [],
      } as QuizContent,
    ],
  },
];

export const microeconomicsCourse: Course = {
  id: 'microeconomics',
  title: 'Microeconomics',
  description: 'Study of individual economic units and their decision-making processes',
  units: [
    {
      id: 'unit-1',
      title: 'Unit 1: Basic economic concepts',
      description: 'Introduction to economics, scarcity, economic systems, and the circular flow model',
      lessons: unit1Lessons,
    },
    {
      id: 'unit-2',
      title: 'Unit 2: Supply, demand, and market equilibrium',
      description: 'Understanding demand, supply, market equilibrium, and how markets adjust to changes',
      lessons: unit2Lessons,
    },
  ],
  finalExamPassRate: 75,
  finalExam: [],
};

