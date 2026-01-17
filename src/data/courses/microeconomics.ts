import type {
  Course,
  Unit,
  Lesson,
  VideoContent,
  ArticleContent,
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
        id: 'micro-u1-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Introduction to economics',
        questions: [
          {
            id: 'quiz-1-1-1',
            question: 'Which of the following best describes what we mean by resources in economics?',
            options: [
              'Natural resources like natural gas and trees',
              'The factors used to produce goods and services',
              'Human resources like workers',
              'The ability to handle a situation',
              'Monetary wealth',
            ],
            correctAnswer: 1,
            explanation: 'In economics, resources refer to the factors used to produce goods and services. These are the four factors of production: land (natural resources), labor (human effort), capital (manufactured goods used in production), and entrepreneurship (the ability to organize and take risks). While natural resources, human resources, and monetary wealth are examples of specific types of resources, the general definition encompasses all factors of production used to create goods and services.',
          },
          {
            id: 'quiz-1-1-2',
            question: 'What must be true for a resource to NOT be scarce?',
            options: [
              'It must be free.',
              'It must be capital.',
              'It must be non-rival.',
              'One person\'s consumption of a resource interferes with another\'s consumption of that resource.',
              'It must be labor.',
            ],
            correctAnswer: 2,
            explanation: 'For a resource to NOT be scarce, it must be non-rival. A non-rival resource is one where one person\'s consumption does not reduce the amount available for others. Examples include radio broadcasts, knowledge, or public parks (up to capacity). If a resource is non-rival and available in unlimited quantities, it is not scarce. Scarcity exists when resources are limited and rival (one person\'s use prevents another\'s use). Being free, being capital, or being labor does not determine whether something is scarce - scarcity depends on whether the resource is limited and rival.',
          },
          {
            id: 'quiz-1-1-3',
            question: 'Which of the following best describes the difference between microeconomics and macroeconomics?',
            options: [
              'Microeconomics is about efficiency; Macroeconomics is about equity',
              'Microeconomics is about markets for financial assets; Macroeconomics is about markets for the factors of production',
              'Microeconomics is about normative analysis; Macroeconomics is about positive analysis',
              'Microeconomics is about how much total output there is in an economy; Macroeconomics is about how much individual firms produce.',
              'Microeconomics is about individuals, households, and firms; Macroeconomics is about economies as a whole',
            ],
            correctAnswer: 4,
            explanation: 'The best description of the difference between microeconomics and macroeconomics is that microeconomics is about individuals, households, and firms, while macroeconomics is about economies as a whole. Microeconomics studies individual economic units and their decision-making (how consumers choose, how firms produce, how markets work). Macroeconomics studies economy-wide phenomena (GDP, inflation, unemployment, economic growth). The other options incorrectly describe the distinction - both branches study efficiency and equity, both use positive and normative analysis, and the output description is reversed.',
          },
          {
            id: 'quiz-1-1-4',
            question: 'What are the four categories of resources?',
            options: [
              'Machines, technology, minerals, and energy resources',
              'Land resources, labor, capital goods, and entrepreneurship',
              'Forest, minerals, ocean, and energy resources',
              'Information technology, physical capital, financial capital, and high skilled workers',
              'High skilled workers, low skilled workers, knowledge workers, and service sector workers',
            ],
            correctAnswer: 1,
            explanation: 'The four categories of resources (factors of production) are: land resources, labor, capital goods, and entrepreneurship. Land includes all natural resources (minerals, water, forests, etc.). Labor is human effort (both physical and mental). Capital goods are manufactured goods used to produce other goods (machinery, tools, buildings). Entrepreneurship is the ability to organize resources and take risks to produce goods and services. These four factors are the fundamental resources used in all production.',
          },
        ],
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
        id: 'micro-u1-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Economic systems',
        questions: [
          {
            id: 'quiz-1-2-1',
            question: 'In the nation of Hamsterville most goods, services, and resources are allocated in markets. However, some goods are provided by the government, such as healthcare and education. What kind of economic system does Hamsterville have?',
            options: [
              'Communist',
              'Pure command system',
              'Pure capitalist system',
              'A mixed system',
              'Pure market system',
            ],
            correctAnswer: 3,
            explanation: 'Hamsterville has a mixed system. A mixed economic system combines elements of both market and command economies. In Hamsterville, most goods and services are allocated through markets (market mechanism), but the government also provides some goods like healthcare and education (government intervention). This is characteristic of most modern economies, which are neither purely market-based nor purely command-based, but rather mixed systems that combine market forces with government provision of certain goods and services.',
          },
          {
            id: 'quiz-1-2-2',
            question: 'Which of the following best captures the three economic questions every economic system must answer?',
            options: [
              'What, how, and when?',
              'What, when, and why?',
              'What, how, and for whom?',
              'How much, how often, and for whom?',
              'When, where, and why?',
            ],
            correctAnswer: 2,
            explanation: 'The three fundamental economic questions that every economic system must answer are: What to produce? (which goods and services), How to produce? (using which methods and resources), and For whom to produce? (who gets the goods and services). These questions arise because of scarcity - resources are limited, so societies must decide what to produce, how to produce it efficiently, and how to distribute the output among members of society.',
          },
          {
            id: 'quiz-1-2-3',
            question: 'What is necessary for the effective functioning of a market system?',
            options: [
              'weak enforcement of ownership claims',
              'well-defined system of property rights',
              'central control of resources of production',
              'centrally coordinated prices',
              'prohibitions on transferring ownership',
            ],
            correctAnswer: 1,
            explanation: 'A well-defined system of property rights is necessary for the effective functioning of a market system. Property rights define who owns resources and how they can be used, transferred, and protected. Without clear property rights, people cannot confidently buy, sell, or invest, which undermines market transactions. Property rights enable markets to function by ensuring that owners can exclude others, transfer ownership, and have their rights enforced. Central control, centrally coordinated prices, and prohibitions on transfer are characteristics of command economies, not market systems.',
          },
          {
            id: 'quiz-1-2-4',
            question: 'Which of the following is NOT true of a pure command economy?',
            options: [
              'Capital and labor are allocated based on a centralized plan',
              'Prices serve as signals to allocate resources',
              'Allocation decisions are centrally coordinated',
              'The factors of production are collectively owned',
              'Production decisions are centrally coordinated',
            ],
            correctAnswer: 1,
            explanation: 'In a pure command economy, prices do NOT serve as signals to allocate resources. In a command economy, resources are allocated according to a central plan, not through market prices. Prices in command economies are typically set by the government and do not reflect supply and demand. The other options are all true of command economies: capital and labor are allocated by central planning, allocation and production decisions are centrally coordinated, and factors of production are collectively owned (by the state).',
          },
        ],
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
        id: 'micro-u2-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Demand',
        questions: [
          {
            id: 'quiz-2-1-1',
            question: 'Which of the following correctly describes a change in quantity demanded and a change in demand?',
            options: [
              'A change in quantity demanded is a response to a price change and a change in demand is a response to a non-price change',
              'A change in demand and a change in quantity demanded both happen in response to price changes',
              'Both describe a movement along a single demand curve',
              'The two terms can be used interchangeably',
              'A change in quantity demanded occurs when price increases and a change in demand occur when a price decreases',
            ],
            correctAnswer: 0,
            explanation: 'A change in quantity demanded is a response to a price change (movement along the demand curve), while a change in demand is a response to a non-price change (shift of the entire demand curve). When the price of a good changes, we move along the demand curve, which is a change in quantity demanded. When factors other than price change (income, preferences, prices of related goods, expectations, number of buyers), the entire demand curve shifts, which is a change in demand. These are distinct concepts and cannot be used interchangeably.',
          },
          {
            id: 'quiz-2-1-2',
            question: 'Pam considers t-shirts and gym classes to be complementary goods. How will Pam react if the price of gym classes increases?',
            options: [
              'Her quantity demanded of gym classes won\'t change, and her demand for t-shirts will increase.',
              'Her quantity demanded of gym classes will increase, and her demand for t-shirts will increase.',
              'Her quantity demanded of gym classes will decrease, and her demand for t-shirts will decrease.',
              'Her quantity demanded of gym classes will decrease, and her demand for t-shirts will be unaffected.',
              'Her quantity demanded of gym classes will increase, and her demand for t-shirts will decrease.',
            ],
            correctAnswer: 2,
            explanation: 'If t-shirts and gym classes are complementary goods, and the price of gym classes increases, Pam\'s quantity demanded of gym classes will decrease (due to the law of demand - higher price leads to lower quantity demanded). Since gym classes and t-shirts are complements (used together), when the price of gym classes increases and fewer gym classes are consumed, the demand for t-shirts will also decrease. This is because complements are goods that are consumed together - if you buy fewer gym classes, you\'ll also buy fewer t-shirts to wear to the gym.',
          },
          {
            id: 'quiz-2-1-3',
            question: 'A government is concerned about whether young children in a community are receiving enough healthcare. Which of the following is the LEAST likely to increase the amount of healthcare that people provide their children?',
            options: [
              'reduce the distance traveled to get healthcare',
              'Provide coupons for free healthcare',
              'Lowering regulations on who can provide healthcare, such as allowing nurses to provide healthcare rather than just doctors',
              'subsidize healthcare',
              'increase the price of healthcare',
            ],
            correctAnswer: 4,
            explanation: 'Increasing the price of healthcare is the LEAST likely to increase the amount of healthcare that people provide their children. According to the law of demand, when the price of a good increases, the quantity demanded decreases. Therefore, increasing the price would likely decrease, not increase, the amount of healthcare consumed. All the other options would likely increase healthcare consumption: reducing distance (lowers cost/time), providing coupons (lowers effective price), lowering regulations (increases supply and may lower price), and subsidizing (lowers effective price to consumers).',
          },
          {
            id: 'quiz-2-1-4',
            question: 'Emily is a rational consumer who gets utility from socks and music lessons, and she considers both of these goods normal goods. Her marginal utility from socks is 50 utils and the price of socks is $5 per pair. Her marginal utility from music lessons is 600 utils and the price of music lessons is $60. If the price of music lessons falls to $20, which of the following best describes the income and substitution effects?',
            options: [
              'The substitution effect is that she now can spend more on either good. The income effect is that the price of music lessons relative to socks has decreased so she will definitely buy more music lessons.',
              'The income effect is that she will no longer buy socks because she has more income to spend on music lessons, so she will only buy music lessons.',
              'The income effect is that she got a raise from her employer. The substitution effect is that music lessons are now relatively cheaper so she will buy more music lessons.',
              'The income effect is that she effectively has more money to spend on either good. The substitution effect is that she will only buy socks now.',
              'The income effect is that she now can spend more on both goods. The substitution effect is that the price of music lessons relative to socks has decreased so she will definitely buy more music lessons.',
            ],
            correctAnswer: 4,
            explanation: 'When the price of music lessons falls from $60 to $20, the income effect is that Emily effectively has more purchasing power (real income increases), allowing her to spend more on both goods. The substitution effect occurs because music lessons are now relatively cheaper compared to socks (the relative price has changed), so Emily will substitute toward music lessons and away from socks, buying more music lessons. Both effects work together: the income effect increases her ability to buy both goods (since both are normal goods), and the substitution effect makes her want to buy more music lessons because they are now relatively cheaper.',
          },
        ],
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
        id: 'micro-u2-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Market equilibrium and changes in equilibrium',
        questions: [
          {
            id: 'quiz-2-3-1',
            question: 'Shampoo and conditioner are complementary goods. What happens to the price and quantity of conditioner if the price of shampoo decreases?',
            options: [
              'Price decreases; quantity increases.',
              'Price increases; quantity decreases.',
              'Price increases; quantity increases.',
              'Price decreases; quantity decreases.',
              'Price decreases; quantity demanded does not change.',
            ],
            correctAnswer: 0,
            explanation: 'If shampoo and conditioner are complementary goods, and the price of shampoo decreases, the price of conditioner will decrease and the quantity will increase. When the price of shampoo decreases, the quantity demanded of shampoo increases (law of demand). Since shampoo and conditioner are complements (used together), the increased consumption of shampoo increases the demand for conditioner. This shifts the demand curve for conditioner to the right. However, the decrease in shampoo price may also lead to increased supply of conditioner (if they are produced together or if producers respond to increased demand by expanding production), which shifts the supply curve to the right. If the supply increase is sufficiently large relative to the demand increase, the equilibrium price of conditioner will decrease while the quantity increases. This scenario demonstrates how complementary goods can affect both demand and supply in related markets.',
          },
          {
            id: 'quiz-2-3-2',
            question: 'In which of the following scenarios would we definitely know that price will increase but we\'d be unable to determine how quantity changes?',
            options: [
              'D↓ and S↑',
              'D↑ and S no change',
              'D↑ and S↑',
              'D↑ and S↓',
              'D↓ and S↓',
            ],
            correctAnswer: 3,
            explanation: 'When demand increases (D↑) and supply decreases (S↓), we can definitely know that price will increase, but we cannot determine how quantity changes. Both shifts put upward pressure on price: increased demand raises price, and decreased supply also raises price. However, the effect on quantity is ambiguous: increased demand tends to increase quantity, while decreased supply tends to decrease quantity. The net effect on quantity depends on the relative magnitudes of the shifts. If the demand increase is larger than the supply decrease, quantity increases. If the supply decrease is larger, quantity decreases. If they are equal, quantity stays the same. Therefore, we know price increases but quantity change is indeterminate.',
          },
        ],
      } as QuizContent,
    ],
  },
];

const unit3Lessons: Lesson[] = [
  {
    id: 'lesson-3-1',
    title: 'Price Elasticity of Demand',
    duration: '45 min',
    contentItems: [
      {
        id: 'micro-u3-l1-video-1',
        type: 'video',
        title: 'Price Elasticity of Demand',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u3-l1-article',
        type: 'article',
        title: 'Learn: Price Elasticity of Demand',
        content: `# Price Elasticity of Demand

## Introduction to price elasticity of demand

**Price elasticity of demand** measures how responsive quantity demanded is to a change in price.

**Formula**: Ed = (% Change in Quantity Demanded) / (% Change in Price)

**Key insight**: Elasticity tells us the percentage change in quantity for each 1% change in price.

**Why it matters**: 
- Helps predict how price changes affect revenue
- Important for pricing decisions
- Shows how sensitive consumers are to price changes

## Price elasticity of demand using the midpoint method

**Midpoint method** (arc elasticity) calculates elasticity using average values:

**Formula**: Ed = [(Q2 - Q1) / ((Q1 + Q2) / 2)] / [(P2 - P1) / ((P1 + P2) / 2)]

**Why use midpoint method**:
- Avoids different answers depending on starting point
- More accurate for large price changes
- Gives same result whether going from A to B or B to A

**Example**:
- Price: $10 → $12 (20% increase using midpoint)
- Quantity: 100 → 80 (22.2% decrease using midpoint)
- Elasticity = -22.2% / 20% = -1.11

**Note**: Elasticity is usually negative (demand curves slope down), but we often use absolute value.

## More on elasticity of demand

**Elasticity ranges**:

**Elastic** (|Ed| > 1):
- Quantity changes more than price (in percentage terms)
- Demand is sensitive to price changes
- Example: Luxury goods, goods with many substitutes

**Inelastic** (|Ed| < 1):
- Quantity changes less than price (in percentage terms)
- Demand is insensitive to price changes
- Example: Necessities, goods with few substitutes

**Unit elastic** (|Ed| = 1):
- Quantity changes by same percentage as price
- Special case

**Perfectly elastic** (|Ed| = ∞):
- Horizontal demand curve
- Any price increase → Quantity drops to zero
- Example: Perfectly competitive firm's demand

**Perfectly inelastic** (|Ed| = 0):
- Vertical demand curve
- Quantity doesn't change with price
- Example: Life-saving medicine (in extreme case)

## Determinants of price elasticity of demand

**Factors that affect elasticity**:

1. **Availability of substitutes**:
   - More substitutes → More elastic
   - Fewer substitutes → More inelastic
   - Example: Generic vs. brand-name drugs

2. **Necessity vs. luxury**:
   - Necessities → Inelastic
   - Luxuries → Elastic
   - Example: Food (inelastic) vs. vacations (elastic)

3. **Proportion of income spent**:
   - Large proportion → More elastic
   - Small proportion → More inelastic
   - Example: Cars (elastic) vs. salt (inelastic)

4. **Time horizon**:
   - Short run → More inelastic (hard to adjust)
   - Long run → More elastic (can find substitutes)
   - Example: Gasoline (inelastic short run, more elastic long run)

5. **Definition of market**:
   - Narrow market → More elastic (more substitutes)
   - Broad market → More inelastic (fewer substitutes)
   - Example: "Coca-Cola" (elastic) vs. "soft drinks" (inelastic)

## Determinants of elasticity example

**Example: Gasoline demand**

**Short run** (inelastic):
- Few substitutes available
- Hard to change driving habits quickly
- Elasticity: ~0.2 (very inelastic)

**Long run** (more elastic):
- Can buy more fuel-efficient car
- Can move closer to work
- Can use public transportation
- Elasticity: ~0.7 (still inelastic but more than short run)

**Key insight**: Elasticity depends on context and time frame.

## Perfect inelasticity and perfect elasticity of demand

**Perfectly inelastic demand** (Ed = 0):
- Vertical demand curve
- Quantity doesn't respond to price changes
- Example: Insulin for diabetics (extreme case)
- Rare in reality

**Perfectly elastic demand** (Ed = ∞):
- Horizontal demand curve
- Any price above market price → Quantity = 0
- Example: Individual firm in perfect competition
- Price taker (must accept market price)

**Graphical representation**:
- Perfectly inelastic: Vertical line
- Perfectly elastic: Horizontal line
- Most goods: Downward sloping curve (somewhere in between)

## Constant unit elasticity

**Unit elastic demand** (Ed = 1):
- Quantity changes by same percentage as price
- Special mathematical case
- Demand curve: Rectangular hyperbola
- Total revenue constant (doesn't change with price)

**Example**: 
- Price increases 10% → Quantity decreases 10%
- Total revenue stays the same

**Key insight**: Unit elasticity is a special case where price and quantity changes exactly offset each other in terms of revenue.

## Total revenue and elasticity

**Total revenue (TR)** = Price × Quantity

**Relationship with elasticity**:

**Elastic demand** (|Ed| > 1):
- Price increase → TR decreases
- Price decrease → TR increases
- Quantity effect dominates

**Inelastic demand** (|Ed| < 1):
- Price increase → TR increases
- Price decrease → TR decreases
- Price effect dominates

**Unit elastic demand** (|Ed| = 1):
- Price change → TR unchanged
- Effects exactly offset

**Key insight**: Understanding elasticity helps predict how price changes affect total revenue.

## More on total revenue and elasticity

**The total revenue test**:

**If price increases and TR increases**:
- Demand is inelastic
- Price effect > Quantity effect

**If price increases and TR decreases**:
- Demand is elastic
- Quantity effect > Price effect

**If price increases and TR unchanged**:
- Demand is unit elastic
- Effects exactly offset

**Graphical representation**:
- On elastic portion of demand curve: TR increases as price decreases
- On inelastic portion: TR increases as price increases
- At unit elastic point: TR is maximized

## Elasticity and strange percent changes

**Why percent changes matter**:
- Absolute changes can be misleading
- $1 change means different things at different price levels
- Percent changes are relative and comparable

**Example**:
- Price: $1 → $2 (100% increase, $1 absolute)
- Price: $100 → $101 (1% increase, $1 absolute)
- Same absolute change, very different percent change

**Midpoint method handles this**:
- Uses average values
- Gives consistent results
- More accurate for large changes

## Price elasticity of demand and price elasticity of supply

**Comparison**:

**Demand elasticity**:
- Usually negative (downward sloping)
- Measures consumer responsiveness
- Affected by substitutes, necessities, time

**Supply elasticity**:
- Usually positive (upward sloping)
- Measures producer responsiveness
- Affected by production flexibility, time, storage

**Key difference**: Supply elasticity often increases with time (producers can adjust production), while demand elasticity may also increase with time (consumers find substitutes).

## Elasticity in the long run and short run

**General pattern**:

**Demand elasticity**:
- Short run: More inelastic (hard to adjust consumption)
- Long run: More elastic (can find substitutes, adjust habits)

**Supply elasticity**:
- Short run: More inelastic (fixed capacity)
- Long run: More elastic (can adjust production, enter/exit)

**Examples**:
- Gasoline: Inelastic short run, more elastic long run
- Housing: Inelastic short run, more elastic long run
- Agricultural products: Inelastic short run (growing season), more elastic long run

**Key insight**: Time allows both consumers and producers to adjust, making both demand and supply more elastic in the long run.

## Elasticity and tax revenue

**Tax revenue** = Tax per unit × Quantity sold

**Effect of elasticity on tax revenue**:

**Inelastic demand**:
- Tax increases price
- Quantity decreases little
- Tax revenue increases (or decreases less)
- Example: Cigarettes, gasoline

**Elastic demand**:
- Tax increases price
- Quantity decreases a lot
- Tax revenue may decrease
- Example: Luxury goods

**Key insight**: Taxes on inelastic goods generate more revenue because quantity doesn't fall much. This is why governments often tax necessities and addictive goods.`,
        importantPoints: [
          'Price elasticity measures responsiveness of quantity to price changes',
          'Elastic (|Ed| > 1): quantity changes more than price',
          'Inelastic (|Ed| < 1): quantity changes less than price',
          'Determinants: substitutes, necessity, income proportion, time, market definition',
          'Elasticity affects total revenue: elastic → price and TR move opposite, inelastic → price and TR move together',
        ],
      } as ArticleContent,
      {
        id: 'micro-u3-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Price Elasticity of Demand',
        questions: [
          {
            id: 'quiz-3-1-1',
            question: 'Which of the following would be an indication that a firm has an elastic demand for its goods?',
            options: [
              'Total revenue increases when it lowers its price',
              'Consumer spending increases when it raises its price',
              'Total revenue doesn\'t change when it raises its price',
              'Consumer spending decreases when it lowers its price',
              'Total revenue doesn\'t change when it lowers its price',
            ],
            correctAnswer: 0,
            explanation: 'If a firm has elastic demand for its goods, total revenue increases when it lowers its price. When demand is elastic (elasticity > 1), the percentage change in quantity demanded is greater than the percentage change in price. Therefore, when price decreases, the increase in quantity sold is proportionally larger than the price decrease, resulting in higher total revenue. This is the key relationship: for elastic demand, price and total revenue move in opposite directions.',
          },
          {
            id: 'quiz-3-1-2',
            question: 'When is demand inelastic?',
            options: [
              'When a market is narrowly defined',
              'When buyers have a lot of time to shop around',
              'When it makes up a large share of a person\'s budget',
              'When a good is a luxury',
              'When there are few substitutes for a good',
            ],
            correctAnswer: 4,
            explanation: 'Demand is inelastic when there are few substitutes for a good. When consumers have limited alternatives, they are less responsive to price changes, resulting in inelastic demand (elasticity < 1). Other factors that make demand inelastic include: when the good is a necessity (not a luxury), when it makes up a small share of a person\'s budget, when buyers have little time to shop around, and when the market is broadly defined. However, the presence of few substitutes is a primary determinant of inelastic demand.',
          },
          {
            id: 'quiz-3-1-3',
            question: 'Susan\'s Shellfish Shack increased the price of their shrimp sandwiches by 10%, and her total revenue increased 20%. Based on this information, what can we conclude about shrimp sandwiches?',
            options: [
              'Consumers consider shrimp sandwiches luxuries.',
              'Consumers consider shrimp sandwiches necessities.',
              'Consumers have an infinite elasticity of demand for shrimp sandwiches.',
              'Consumers have a unit elastic demand for shrimp sandwiches.',
              'Consumers think shrimp sandwiches and crab sandwiches are substitutes.',
            ],
            correctAnswer: 1,
            explanation: 'When price increases by 10% and total revenue increases by 20%, this indicates that demand is inelastic. For inelastic demand, price and total revenue move in the same direction. Since revenue increased more than price, the quantity demanded decreased by less than 10% (specifically, by about 9.1% to result in a 20% revenue increase). Inelastic demand is characteristic of necessities - goods that consumers need regardless of price changes. Therefore, consumers consider shrimp sandwiches necessities.',
          },
          {
            id: 'quiz-3-1-4',
            question: 'Which of these values of price elasticity will result in no change in total revenue if a firm increases its price?',
            options: [
              '0.5',
              '3',
              '1',
              '∞',
              '0',
            ],
            correctAnswer: 2,
            explanation: 'A price elasticity of demand equal to 1 (unit elastic) will result in no change in total revenue when a firm increases its price. When elasticity = 1, the percentage change in quantity demanded exactly equals the percentage change in price. Therefore, when price increases, the decrease in quantity is proportionally equal, leaving total revenue unchanged. This is the special case of unit elasticity, where price and quantity changes exactly offset each other in terms of revenue impact.',
          },
        ],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-3-2',
    title: 'Price Elasticity of Supply',
    duration: '30 min',
    contentItems: [
      {
        id: 'micro-u3-l2-video-1',
        type: 'video',
        title: 'Price Elasticity of Supply',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u3-l2-article',
        type: 'article',
        title: 'Learn: Price Elasticity of Supply',
        content: `# Price Elasticity of Supply

## Introduction to price elasticity of supply

**Price elasticity of supply** measures how responsive quantity supplied is to a change in price.

**Formula**: Es = (% Change in Quantity Supplied) / (% Change in Price)

**Key insight**: Elasticity tells us the percentage change in quantity supplied for each 1% change in price.

**Why it matters**:
- Shows how easily producers can adjust production
- Important for understanding market responses
- Affects how prices adjust to demand changes

## Elasticity of supply using a different method

**Point elasticity method** (alternative to midpoint):

**Formula**: Es = (dQs/dP) × (P/Qs)

Where:
- dQs/dP = Slope of supply curve
- P = Price
- Qs = Quantity supplied

**When to use**:
- For small price changes
- When you have the supply function
- More precise for specific points

**Comparison with midpoint method**:
- Midpoint: Better for large changes, avoids direction bias
- Point: Better for small changes, more precise at specific points

**Key insight**: Both methods measure the same concept; choose based on available data and size of change.

## Price elasticity of supply determinants

**Factors that affect supply elasticity**:

1. **Production flexibility**:
   - Easy to adjust production → More elastic
   - Hard to adjust production → More inelastic
   - Example: Services (elastic) vs. agricultural products (inelastic)

2. **Time horizon**:
   - Short run → More inelastic (fixed capacity)
   - Long run → More elastic (can adjust all inputs)
   - Example: Manufacturing (inelastic short run, elastic long run)

3. **Availability of inputs**:
   - Easy to get inputs → More elastic
   - Hard to get inputs → More inelastic
   - Example: Common materials (elastic) vs. rare materials (inelastic)

4. **Storage capacity**:
   - Can store goods → More elastic (can adjust inventory)
   - Can't store goods → More inelastic (must sell immediately)
   - Example: Manufactured goods (elastic) vs. perishables (inelastic)

5. **Spare capacity**:
   - Have unused capacity → More elastic (can increase quickly)
   - Operating at capacity → More inelastic (hard to increase)
   - Example: Hotels with empty rooms (elastic) vs. fully booked (inelastic)

## Price elasticity of supply determinants (additional)

**More factors**:

6. **Technology**:
   - Advanced technology → More elastic (easier to adjust)
   - Simple technology → More inelastic
   - Example: Digital products (very elastic) vs. handcrafted goods (inelastic)

7. **Number of producers**:
   - Many producers → More elastic (market can adjust)
   - Few producers → More inelastic
   - Example: Competitive markets (elastic) vs. monopolies (inelastic)

8. **Mobility of resources**:
   - Resources can move easily → More elastic
   - Resources fixed → More inelastic
   - Example: Labor (elastic) vs. specialized equipment (inelastic)

**Perfectly inelastic supply** (Es = 0):
- Vertical supply curve
- Quantity doesn't respond to price
- Example: Fixed quantity (land in short run, unique artwork)

**Perfectly elastic supply** (Es = ∞):
- Horizontal supply curve
- Can supply any quantity at market price
- Example: Perfect competition in long run

**Key insight**: Supply elasticity depends on how easily producers can adjust production in response to price changes.`,
        importantPoints: [
          'Price elasticity of supply measures responsiveness of quantity supplied to price',
          'Determinants: production flexibility, time horizon, input availability, storage, capacity',
          'Short run: more inelastic (fixed capacity)',
          'Long run: more elastic (can adjust all inputs)',
          'Supply elasticity helps predict how markets adjust to changes',
        ],
      } as ArticleContent,
      {
        id: 'micro-u3-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Price Elasticity of Supply',
        questions: [
          {
            id: 'quiz-3-2-1',
            question: 'Quinn\'s Cupcake shop has a price elasticity of supply of 3.75. Which of the following statements is the correct interpretation of this price elasticity of supply?',
            options: [
              'For every $3.75 increase in price, Quinn will be willing to sell 1% more cupcakes',
              'For every 1% increase in price, Quinn will be willing to sell 3.75% more cupcakes',
              'For every $3.75 increase in price, Quinn will be willing to sell 1 more cupcake',
              'For every 1% increase in price, Quinn will be willing to sell 3.75 more cupcakes',
              'For every 3.75% increase in price, Quinn is willing to sell 1 more cupcake',
            ],
            correctAnswer: 1,
            explanation: 'Price elasticity of supply measures the percentage change in quantity supplied divided by the percentage change in price. An elasticity of 3.75 means that for every 1% increase in price, the quantity supplied increases by 3.75%. This is an elastic supply (elasticity > 1), indicating that Quinn can significantly increase production in response to price increases. The elasticity is a unitless measure that relates percentage changes, not absolute dollar or unit changes.',
          },
          {
            id: 'quiz-3-2-2',
            question: 'What measure is used to determine how responsive a producer is to price changes?',
            options: [
              'Cross price elasticity of demand',
              'Price elasticity of demand',
              'Price elasticity of supply',
              'Input price elasticity of supply',
              'Income elasticity of demand',
            ],
            correctAnswer: 2,
            explanation: 'Price elasticity of supply is the measure used to determine how responsive a producer is to price changes. It measures the percentage change in quantity supplied divided by the percentage change in price. This tells us how much producers will adjust their production when the price of the good they produce changes. Price elasticity of demand measures consumer responsiveness, cross price elasticity measures how demand for one good responds to price changes of another good, income elasticity measures how demand responds to income changes, and input price elasticity of supply is not a standard economic measure.',
          },
          {
            id: 'quiz-3-2-3',
            question: 'When the price of canned pickle juice increased 50%, the quantity supplied of pickle juice increased 40%. What is the price elasticity of supply, and how is that value interpreted?',
            options: [
              '0.10; unit elastic',
              '1.25; elastic',
              '0.8; elastic',
              '0.10; inelastic',
              '0.8; inelastic',
            ],
            correctAnswer: 4,
            explanation: 'Price elasticity of supply is calculated as the percentage change in quantity supplied divided by the percentage change in price. In this case: 40% / 50% = 0.8. Since 0.8 is less than 1, the supply is inelastic. This means that producers are not very responsive to price changes - a 50% increase in price only leads to a 40% increase in quantity supplied. Inelastic supply (elasticity < 1) indicates that producers have limited ability to quickly increase production, possibly due to fixed inputs, production constraints, or time limitations.',
          },
          {
            id: 'quiz-3-2-4',
            question: 'Which of the following values of price elasticity of supply suggests that production uses inputs that are highly substitutable?',
            options: [
              '20',
              '0',
              '0.5',
              '1',
              '0.1',
            ],
            correctAnswer: 0,
            explanation: 'A price elasticity of supply of 20 suggests that production uses inputs that are highly substitutable. When inputs are highly substitutable, producers can easily shift resources and adjust production in response to price changes. An elasticity of 20 means that for every 1% increase in price, quantity supplied increases by 20%, indicating highly elastic supply. This high responsiveness is possible when producers can easily substitute inputs and resources to increase production. Values less than 1 (0, 0.5, 0.1) indicate inelastic supply, suggesting limited substitutability or production constraints. A value of 1 indicates unit elasticity.',
          },
        ],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-3-3',
    title: 'Income Elasticity of Demand and Cross-Price Elasticity of Demand',
    duration: '35 min',
    contentItems: [
      {
        id: 'micro-u3-l3-video-1',
        type: 'video',
        title: 'Income Elasticity of Demand and Cross-Price Elasticity of Demand',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u3-l3-article',
        type: 'article',
        title: 'Learn: Income Elasticity of Demand and Cross-Price Elasticity of Demand',
        content: `# Income Elasticity of Demand and Cross-Price Elasticity of Demand

## Income elasticity of demand

**Income elasticity of demand** measures how responsive quantity demanded is to a change in income.

**Formula**: Ei = (% Change in Quantity Demanded) / (% Change in Income)

**Key insight**: Tells us how demand changes when consumer income changes.

**Interpretation**:

**Normal goods** (Ei > 0):
- Demand increases when income increases
- Most goods are normal goods
- Examples: Cars, housing, restaurant meals, vacations

**Inferior goods** (Ei < 0):
- Demand decreases when income increases
- Consumers switch to better alternatives
- Examples: Generic brands, ramen noodles, used cars (for some), public transportation (for some)

**Luxury goods** (Ei > 1):
- Demand increases more than proportionally with income
- Income elastic
- Examples: Luxury cars, fine dining, expensive vacations

**Necessities** (0 < Ei < 1):
- Demand increases but less than proportionally with income
- Income inelastic
- Examples: Basic food, utilities, housing (basic)

**Key insight**: Income elasticity helps classify goods and predict how demand changes with economic growth.

## Elasticity in areas other than price

**Other types of elasticity**:

1. **Income elasticity**: How demand responds to income changes
2. **Cross-price elasticity**: How demand responds to price of related goods
3. **Price elasticity of supply**: How supply responds to price changes

**Why they matter**:
- Help understand market relationships
- Predict responses to economic changes
- Important for business and policy decisions

**Common pattern**: All elasticities measure responsiveness of one variable to changes in another.

## Cross-price elasticity of demand

**Cross-price elasticity of demand** measures how responsive quantity demanded of one good is to a change in the price of another good.

**Formula**: Ec = (% Change in Quantity Demanded of Good X) / (% Change in Price of Good Y)

**Interpretation**:

**Substitutes** (Ec > 0):
- Positive cross-price elasticity
- When price of Y increases, demand for X increases
- Consumers substitute X for Y
- Examples: Coffee and tea, butter and margarine, Coke and Pepsi

**Complements** (Ec < 0):
- Negative cross-price elasticity
- When price of Y increases, demand for X decreases
- Goods used together
- Examples: Coffee and cream, cars and gasoline, computers and software

**Unrelated goods** (Ec = 0):
- Zero cross-price elasticity
- No relationship between the goods
- Examples: Coffee and shoes, unrelated products

**Magnitude**:
- Large positive value → Close substitutes
- Large negative value → Strong complements
- Small value → Weak relationship

## Lesson Overview - Cross-Price Elasticity and Income Elasticity of Demand

**Summary of elasticities**:

**Price elasticity of demand**:
- Measures: Responsiveness of Qd to price
- Formula: %ΔQd / %ΔP
- Usually negative
- Determines total revenue effects

**Income elasticity of demand**:
- Measures: Responsiveness of Qd to income
- Formula: %ΔQd / %ΔI
- Positive for normal goods, negative for inferior goods
- Classifies goods (normal, inferior, luxury, necessity)

**Cross-price elasticity of demand**:
- Measures: Responsiveness of Qd of X to price of Y
- Formula: %ΔQdX / %ΔPY
- Positive for substitutes, negative for complements
- Identifies relationships between goods

**Key applications**:
- Business: Pricing strategies, product positioning
- Policy: Tax effects, market analysis
- Economics: Understanding market relationships

**Key insight**: Different elasticities measure different relationships and help us understand how markets respond to various changes.`,
        importantPoints: [
          'Income elasticity: measures how demand responds to income changes',
          'Normal goods: Ei > 0; inferior goods: Ei < 0',
          'Luxury goods: Ei > 1; necessities: 0 < Ei < 1',
          'Cross-price elasticity: measures relationship between goods',
          'Substitutes: Ec > 0; complements: Ec < 0',
        ],
      } as ArticleContent,
      {
        id: 'micro-u3-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Income Elasticity of Demand and Cross-Price Elasticity of Demand',
        questions: [
          {
            id: 'quiz-3-3-1',
            question: 'When Pam\'s income increased by 10%, she bought 5% fewer containers of yogurt. What kind of good does Pam consider yogurt?',
            options: [
              'An inferior good',
              'Substitute for eggs',
              'A normal necessity',
              'A normal luxury',
              'Complementary with peaches',
            ],
            correctAnswer: 0,
            explanation: 'Yogurt is an inferior good for Pam. When income increased by 10%, she bought 5% fewer containers of yogurt. This negative relationship between income and quantity demanded (income elasticity < 0) defines an inferior good. As income rises, consumers buy less of inferior goods, often because they can afford better substitutes. In this case, Pam likely switches to higher-quality or more preferred alternatives as her income increases.',
          },
          {
            id: 'quiz-3-3-2',
            question: 'The income elasticity of demand for healthcare in Artland is 2.5. In 2001 the quantity demanded of healthcare decreased by 25%. What kind of good is healthcare to the citizens of Artland?',
            options: [
              'Artland\'s citizens consider this a substitute good.',
              'Artland\'s citizens consider this a normal good.',
              'Artland\'s citizens consider this an inferior good.',
              'Artland\'s citizens consider this a complementary good.',
              'Artland\'s citizens consider this a necessity.',
            ],
            correctAnswer: 1,
            explanation: 'Healthcare is a normal good to the citizens of Artland. The income elasticity of demand is 2.5, which is positive. A positive income elasticity (YED > 0) indicates a normal good - as income increases, demand for the good increases. Since 2.5 > 1, healthcare is actually a luxury good (a type of normal good), but the question asks what kind of good it is, and "normal good" is the correct classification. The fact that quantity demanded decreased by 25% in 2001 is consistent with a decrease in income (since it\'s a normal good, lower income leads to lower demand), but doesn\'t change the classification based on the elasticity value.',
          },
          {
            id: 'quiz-3-3-3',
            question: 'Which of the following goods would most likely have an income elasticity of -2?',
            options: [
              'Used cars in a society that values new goods',
              'Rice in a country where it is a staple food consumed by most people',
              'Airplane tickets in a society that values travel',
              'Books in a society that values education',
            ],
            correctAnswer: 0,
            explanation: 'Used cars in a society that values new goods would most likely have an income elasticity of -2. An income elasticity of -2 indicates an inferior good (negative elasticity), where a 1% increase in income leads to a 2% decrease in quantity demanded. In a society that values new goods, as people\'s income increases, they are more likely to purchase new cars instead of used cars, causing the demand for used cars to decrease significantly. This makes used cars an inferior good with a strong negative income elasticity. Rice (a staple food) typically has low positive or near-zero elasticity, airplane tickets are normal/luxury goods (positive elasticity), and books are normal goods (positive elasticity).',
          },
        ],
      } as QuizContent,
    ],
  },
];

const unit4Lessons: Lesson[] = [
  {
    id: 'lesson-4-1',
    title: 'Consumer and Producer Surplus',
    duration: '30 min',
    contentItems: [
      {
        id: 'micro-u4-l1-video-1',
        type: 'video',
        title: 'Consumer and Producer Surplus',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u4-l1-article',
        type: 'article',
        title: 'Learn: Consumer and Producer Surplus',
        content: `# Consumer and Producer Surplus

## Demand curve as marginal benefit curve

**Demand curve** represents the **marginal benefit** consumers receive from each additional unit.

**Marginal benefit**: The additional benefit from consuming one more unit.

**Key insight**: The demand curve shows:
- Maximum willingness to pay for each unit
- Marginal benefit of each unit
- Value consumers place on the good

**Why it matters**: Understanding demand as marginal benefit helps explain consumer surplus.

## Consumer surplus introduction

**Consumer surplus** is the difference between what consumers are willing to pay and what they actually pay.

**Formula**: Consumer Surplus = Willingness to Pay - Price Paid

**Example**:
- Willingness to pay: $10
- Market price: $6
- Consumer surplus: $10 - $6 = $4

**For each consumer**: Consumer surplus = Individual benefit - Price paid

**Total consumer surplus**: Sum of all individual consumer surpluses.

**Key insight**: Consumer surplus measures the net benefit consumers receive from participating in the market.

## Total consumer surplus as area

**Graphical representation**:
- Consumer surplus is the area **below** the demand curve and **above** the price line
- Triangle (or area) between demand curve and price

**Calculation**:
- For linear demand: Area of triangle
- Formula: CS = ½ × Base × Height
- Base = Quantity
- Height = Difference between maximum price and market price

**Example**:
- Demand curve: P = 20 - 2Q
- Market price: $10
- Quantity: 5 units
- Consumer surplus = ½ × 5 × (20 - 10) = ½ × 5 × 10 = $25

**Key insight**: Consumer surplus can be calculated as the area under the demand curve above the market price.

## Producer surplus

**Producer surplus** is the difference between what producers receive (price) and their minimum willingness to accept (marginal cost).

**Formula**: Producer Surplus = Price Received - Minimum Willingness to Accept

**For each producer**: Producer surplus = Price - Marginal cost

**Total producer surplus**: Sum of all individual producer surpluses.

**Graphical representation**:
- Producer surplus is the area **above** the supply curve and **below** the price line
- Triangle (or area) between supply curve and price

**Calculation**:
- For linear supply: Area of triangle
- Formula: PS = ½ × Base × Height
- Base = Quantity
- Height = Difference between market price and minimum price

**Key insight**: Producer surplus measures the net benefit producers receive from participating in the market.

## Equilibrium, allocative efficiency and total surplus

**Market equilibrium**:
- Where demand and supply intersect
- Quantity demanded = Quantity supplied
- Price clears the market

**Total surplus** = Consumer Surplus + Producer Surplus

**Allocative efficiency**:
- Achieved when total surplus is maximized
- Occurs at market equilibrium (in competitive markets)
- Resources are allocated to their highest-valued uses
- No way to make someone better off without making someone worse off (Pareto efficiency)

**Why equilibrium is efficient**:
- All mutually beneficial trades occur
- Marginal benefit = Marginal cost
- No deadweight loss
- Total surplus is maximized

**Key insight**: Competitive market equilibrium achieves allocative efficiency and maximizes total surplus.

## Lesson Overview: Consumer and Producer Surplus

**Summary**:

**Consumer surplus**:
- Benefit consumers receive above what they pay
- Area below demand curve, above price
- Measures consumer welfare

**Producer surplus**:
- Benefit producers receive above their costs
- Area above supply curve, below price
- Measures producer welfare

**Total surplus**:
- Sum of consumer and producer surplus
- Maximized at competitive equilibrium
- Measures market efficiency

**Allocative efficiency**:
- Achieved when total surplus is maximized
- Competitive markets achieve this at equilibrium
- Resources allocated to highest-valued uses

**Key insight**: Surplus measures the benefits of market exchange. Competitive markets maximize total surplus, achieving allocative efficiency.`,
        importantPoints: [
          'Demand curve represents marginal benefit',
          'Consumer surplus = willingness to pay - price paid',
          'Producer surplus = price - marginal cost',
          'Total surplus = consumer surplus + producer surplus',
          'Competitive equilibrium maximizes total surplus (allocative efficiency)',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-4-2',
    title: 'Market Interventions and Deadweight Loss',
    duration: '50 min',
    contentItems: [
      {
        id: 'micro-u4-l2-video-1',
        type: 'video',
        title: 'Market Interventions and Deadweight Loss',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u4-l2-article',
        type: 'article',
        title: 'Learn: Market Interventions and Deadweight Loss',
        content: `# Market Interventions and Deadweight Loss

## Rent control and deadweight loss

**Rent control** is a price ceiling on rental housing.

**Effects**:
- Price below equilibrium → Shortage (excess demand)
- Quantity transacted decreases
- Some consumers benefit (lower rent)
- Some consumers lose (can't find housing)
- Landlords lose (lower revenue)

**Deadweight loss**:
- Loss of total surplus due to market intervention
- Mutually beneficial trades that don't occur
- Triangle between supply and demand curves
- Represents lost efficiency

**Why deadweight loss occurs**:
- Quantity is below equilibrium
- Some consumers willing to pay more than marginal cost
- But trades don't happen due to price control
- Total surplus decreases

**Key insight**: Price ceilings create shortages and deadweight loss by preventing the market from reaching equilibrium.

## Minimum wage and price floors

**Price floor**: Minimum price allowed (e.g., minimum wage).

**Effects**:
- Price above equilibrium → Surplus (excess supply)
- Quantity transacted decreases
- Some workers benefit (higher wage)
- Some workers lose (unemployment)
- Employers lose (higher costs)

**Deadweight loss**:
- Loss of total surplus
- Mutually beneficial trades that don't occur
- Workers willing to work at lower wage, employers willing to hire
- But trades don't happen due to price floor

**Key insight**: Price floors create surpluses and deadweight loss by preventing the market from reaching equilibrium.

## How price controls reallocate surplus

**Price ceiling** (e.g., rent control):
- Consumer surplus: May increase for those who get housing, but decreases overall
- Producer surplus: Decreases
- Deadweight loss: Created
- **Transfer**: Some surplus transferred from producers to consumers (who get housing)

**Price floor** (e.g., minimum wage):
- Consumer surplus: Decreases (employers are consumers of labor)
- Producer surplus: May increase for workers who keep jobs, but decreases overall
- Deadweight loss: Created
- **Transfer**: Some surplus transferred from employers to workers (who keep jobs)

**Key insight**: Price controls not only create deadweight loss but also redistribute surplus between consumers and producers.

## Price ceilings and price floors

**Price ceiling**: Maximum price allowed (below equilibrium).

**Effects**:
- Creates shortage
- Reduces quantity transacted
- Creates deadweight loss
- Transfers surplus from producers to consumers (who can buy)

**Examples**: Rent control, price caps on utilities, gas price controls

**Price floor**: Minimum price allowed (above equilibrium).

**Effects**:
- Creates surplus
- Reduces quantity transacted
- Creates deadweight loss
- Transfers surplus from consumers to producers (who can sell)

**Examples**: Minimum wage, agricultural price supports

**Key insight**: Both price ceilings and floors reduce efficiency and create deadweight loss.

## Taxation and deadweight loss

**Tax effects**:
- Creates a wedge between price buyers pay and price sellers receive
- Reduces quantity transacted
- Creates deadweight loss
- Redistributes surplus (to government as tax revenue)

**Tax incidence**: Who bears the burden of the tax?

**Depends on elasticities**:
- More inelastic side bears more of the tax burden
- If demand is inelastic → Consumers bear more
- If supply is inelastic → Producers bear more

**Deadweight loss from tax**:
- Triangle between supply and demand curves
- Represents lost trades
- Increases with tax size and elasticities

## Example breaking down tax incidence

**Example**: $2 tax on a good

**If demand is inelastic, supply is elastic**:
- Consumers pay most of the tax (e.g., $1.80)
- Producers pay little (e.g., $0.20)
- Quantity decreases little

**If demand is elastic, supply is inelastic**:
- Producers pay most of the tax (e.g., $1.80)
- Consumers pay little (e.g., $0.20)
- Quantity decreases more

**If both are inelastic**:
- Burden shared more equally
- Quantity decreases little
- Small deadweight loss

**If both are elastic**:
- Burden shared
- Quantity decreases a lot
- Large deadweight loss

**Key insight**: Tax incidence depends on relative elasticities. The more inelastic side bears more of the burden.

## Percentage tax on hamburgers

**Ad valorem tax**: Tax as percentage of price (e.g., 10% sales tax).

**Effects**:
- Similar to per-unit tax
- Creates wedge between buyer and seller prices
- Reduces quantity
- Creates deadweight loss

**Difference from per-unit tax**:
- Tax amount varies with price
- Higher price → Higher tax amount
- Lower price → Lower tax amount

**Key insight**: Both per-unit and percentage taxes create deadweight loss, but percentage taxes vary with price.

## Taxes and perfectly inelastic demand

**Perfectly inelastic demand** (vertical demand curve):
- Quantity doesn't respond to price
- Consumers bear entire tax burden
- No deadweight loss (quantity unchanged)
- All surplus loss is transfer to government

**Example**: Life-saving medicine (extreme case)

**Key insight**: When demand is perfectly inelastic, taxes don't create deadweight loss but consumers bear the full burden.

## Taxes and perfectly elastic demand

**Perfectly elastic demand** (horizontal demand curve):
- Consumers won't pay above market price
- Producers bear entire tax burden
- Large deadweight loss (quantity decreases a lot)
- Most surplus loss is deadweight loss

**Example**: Individual firm in perfect competition

**Key insight**: When demand is perfectly elastic, producers bear the full tax burden and deadweight loss is large.

## Economic efficiency

**Economic efficiency**:
- Maximizing total surplus
- Allocative efficiency: Resources allocated to highest-valued uses
- Productive efficiency: Producing at lowest cost
- No deadweight loss

**Market interventions reduce efficiency**:
- Price controls: Create deadweight loss
- Taxes: Create deadweight loss (unless demand/supply perfectly inelastic)
- Subsidies: Can create deadweight loss
- Quotas: Create deadweight loss

**Trade-off**:
- Sometimes interventions have other goals (equity, safety)
- But they come at cost of efficiency
- Deadweight loss measures this cost

**Key insight**: Market interventions typically reduce economic efficiency by creating deadweight loss, though they may achieve other goals.

## Lesson Overview: Taxation and Deadweight Loss

**Summary**:

**Tax effects**:
- Creates wedge between buyer and seller prices
- Reduces quantity transacted
- Creates deadweight loss
- Redistributes surplus to government

**Tax incidence**:
- Depends on elasticities
- More inelastic side bears more burden
- Can fall on consumers, producers, or both

**Deadweight loss**:
- Loss of total surplus
- Increases with tax size
- Increases with elasticities
- Zero if demand or supply perfectly inelastic

**Price controls**:
- Price ceilings: Create shortages and deadweight loss
- Price floors: Create surpluses and deadweight loss
- Both reduce efficiency

**Key insight**: Market interventions reduce efficiency by creating deadweight loss, though they may serve other purposes.`,
        importantPoints: [
          'Price controls create deadweight loss by preventing equilibrium',
          'Taxes create deadweight loss and redistribute surplus',
          'Tax incidence depends on elasticities: more inelastic side bears more burden',
          'Deadweight loss increases with tax size and elasticities',
          'Market interventions reduce economic efficiency',
        ],
      } as ArticleContent,
      {
        id: 'micro-u4-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Market Interventions and Deadweight Loss',
        questions: [
          {
            id: 'quiz-4-2-1',
            question: 'The nation of Hamsterville has passed a law that from this day forth, nobody shall sell a bowl of gazpacho for more than $10 per bowl. Nobody really cares, however, because the equilibrium price of gazpacho in Hamsterville is $8. What is the term for the price control described above?',
            options: [
              'A binding price floor',
              'A quota',
              'A non-binding price floor',
              'A binding price ceiling',
              'A non-binding price ceiling',
            ],
            correctAnswer: 4,
            explanation: 'This is a non-binding price ceiling. A price ceiling is a maximum legal price that can be charged for a good. In this case, the law sets a maximum price of $10 per bowl. However, since the equilibrium price ($8) is below the ceiling ($10), the price ceiling is not binding - it doesn\'t affect the market because the equilibrium price is already below the legal maximum. A binding price ceiling would be set below the equilibrium price, causing shortages. A price floor is a minimum legal price, not a maximum.',
          },
          {
            id: 'quiz-4-2-2',
            question: 'What is the term for a minimum legal price imposed on a market?',
            options: [
              'Quota',
              'Tariff',
              'Price floor',
              'Price ceiling',
              'Equilibrium price',
            ],
            correctAnswer: 2,
            explanation: 'A price floor is a minimum legal price imposed on a market. It sets the lowest price at which a good can be legally sold. Price floors are typically set above the equilibrium price to help producers (e.g., minimum wage laws, agricultural price supports). A price ceiling is a maximum legal price. A quota is a limit on quantity. A tariff is a tax on imports. Equilibrium price is the market-clearing price without government intervention.',
          },
          {
            id: 'quiz-4-2-3',
            question: 'The city of Montrose recently imposed a price ceiling on cookies, limiting the price of a cookie to $1 each. Before the price ceiling was imposed, the equilibrium price of a cookie was $2 each. All of the following are likely consequences of this price ceiling EXCEPT',
            options: [
              'higher opportunity costs',
              'shortages',
              'a black market for cookies',
              'an increase in the size of cookies',
              'a decrease in cookie quality',
            ],
            correctAnswer: 3,
            explanation: 'An increase in the size of cookies is NOT a likely consequence of a binding price ceiling. When a price ceiling is set below the equilibrium price ($1 < $2), it creates a binding constraint. Typical consequences include: shortages (quantity demanded exceeds quantity supplied), black markets (illegal trading above the ceiling), decreased quality (producers cut costs to maintain profitability), and higher opportunity costs (time spent searching, waiting, or competing for limited supply). However, producers have no incentive to increase cookie size when prices are constrained - they would likely reduce size or quality to cut costs instead.',
          },
        ],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-4-3',
    title: 'International Trade',
    duration: '35 min',
    contentItems: [
      {
        id: 'micro-u4-l3-video-1',
        type: 'video',
        title: 'International Trade',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u4-l3-article',
        type: 'article',
        title: 'Learn: International Trade',
        content: `# International Trade

## Changing equilibria from trade

**Autarky**: No trade (closed economy).

**With trade**:
- World price may differ from domestic equilibrium price
- If world price < domestic price → Import
- If world price > domestic price → Export

**Effects of opening to trade**:

**If world price < domestic price (import case)**:
- Domestic price falls to world price
- Domestic quantity demanded increases
- Domestic quantity supplied decreases
- Imports = Qd - Qs
- Consumer surplus increases
- Producer surplus decreases
- Total surplus increases (gains from trade)

**If world price > domestic price (export case)**:
- Domestic price rises to world price
- Domestic quantity demanded decreases
- Domestic quantity supplied increases
- Exports = Qs - Qd
- Consumer surplus decreases
- Producer surplus increases
- Total surplus increases (gains from trade)

**Key insight**: Trade increases total surplus (gains from trade) but creates winners and losers.

## Trade and tariffs

**Tariff**: Tax on imported goods.

**Effects of tariff**:
- Increases price of imports
- Reduces quantity of imports
- Increases domestic production
- Decreases domestic consumption
- Creates deadweight loss
- Generates government revenue

**Winners and losers from tariff**:
- **Winners**: Domestic producers (higher price, more sales)
- **Losers**: Domestic consumers (higher price, less consumption)
- **Government**: Gains tariff revenue
- **Overall**: Deadweight loss (efficiency loss)

**Deadweight loss from tariff**:
- Two triangles:
  1. Production inefficiency (domestic production above world cost)
  2. Consumption inefficiency (consumption below world benefit)

**Key insight**: Tariffs protect domestic producers but harm consumers and create deadweight loss.

## Sample free response question (FRQ) on tariffs and trade

**Typical FRQ structure**:

1. **Identify equilibrium without trade**
   - Find domestic equilibrium price and quantity

2. **Identify equilibrium with free trade**
   - World price becomes domestic price
   - Calculate imports/exports
   - Calculate consumer and producer surplus

3. **Analyze effects of tariff**
   - New price = world price + tariff
   - Calculate new quantity demanded and supplied
   - Calculate imports
   - Calculate consumer surplus, producer surplus, government revenue, deadweight loss

4. **Compare outcomes**
   - Who gains? Who loses?
   - What happens to total surplus?

**Key concepts to apply**:
- Consumer surplus (area below demand, above price)
- Producer surplus (area above supply, below price)
- Deadweight loss (triangles of lost efficiency)
- Gains from trade (increase in total surplus)

**Key insight**: Understanding trade and tariffs requires analyzing changes in prices, quantities, surpluses, and efficiency.`,
        importantPoints: [
          'Trade increases total surplus (gains from trade)',
          'Trade creates winners (consumers in import case, producers in export case) and losers',
          'Tariffs protect domestic producers but harm consumers',
          'Tariffs create deadweight loss (production and consumption inefficiency)',
          'Trade analysis requires comparing surpluses with and without trade',
        ],
      } as ArticleContent,
    ],
  },
];

const unit5Lessons: Lesson[] = [
  {
    id: 'lesson-5-1',
    title: 'Introduction to consumer theory; total utility and marginal utility',
    duration: '35 min',
    contentItems: [
      {
        id: 'micro-u5-l1-video-1',
        type: 'video',
        title: 'Introduction to consumer theory; total utility and marginal utility',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u5-l1-article',
        type: 'article',
        title: 'Learn: Introduction to consumer theory; total utility and marginal utility',
        content: `# Introduction to consumer theory; total utility and marginal utility

## Marginal utility and total utility

**Utility**: Satisfaction or happiness from consuming a good.

**Total utility (TU)**: Total satisfaction from consuming a certain quantity of a good.

**Marginal utility (MU)**: Additional satisfaction from consuming one more unit of a good.

**Formula**: MU = ΔTU / ΔQ

**Law of diminishing marginal utility**:
- As consumption increases, marginal utility decreases
- First unit provides most satisfaction
- Each additional unit provides less satisfaction
- Example: First slice of pizza is great, second is good, third is okay, fourth is too much

**Relationship**:
- Total utility increases as quantity increases (but at decreasing rate)
- Marginal utility decreases as quantity increases
- When MU = 0, TU is maximized
- When MU < 0, TU decreases (too much consumption)

## Visualizing marginal utility (MU) and total utility (TU) functions

**Total utility curve**:
- Upward sloping (increases with quantity)
- Slope decreases (diminishing marginal utility)
- Eventually flattens or decreases (negative MU)

**Marginal utility curve**:
- Downward sloping (decreases with quantity)
- Can become negative (too much consumption)
- Area under MU curve = Total utility

**Key relationships**:
- MU is the slope of TU curve
- When MU > 0, TU increases
- When MU = 0, TU is at maximum
- When MU < 0, TU decreases

**Graphical representation**:
- TU on Y-axis, Quantity on X-axis: Upward sloping, concave
- MU on Y-axis, Quantity on X-axis: Downward sloping

## Utility maximization: equalizing marginal utility per dollar

**Utility maximization rule**: Allocate budget so that marginal utility per dollar is equal across all goods.

**Formula**: MUₐ / Pₐ = MUᵦ / Pᵦ = ... = MUₙ / Pₙ

Where:
- MU = Marginal utility
- P = Price

**Why this works**:
- If MUₐ/Pₐ > MUᵦ/Pᵦ, get more utility per dollar from good A
- Should buy more of A and less of B
- Continue until equal

**Example**:
- Good A: MU = 10, P = $2 → MU/P = 5
- Good B: MU = 15, P = $3 → MU/P = 5
- Equal MU per dollar → Optimal allocation

**Key insight**: Consumers maximize utility when the marginal utility per dollar spent is equal for all goods.

## Deriving demand curve from tweaking marginal utility per dollar

**How to derive demand curve**:

1. Start with utility maximization condition: MU/P = constant
2. Change price of one good
3. MU/P for that good changes
4. Consumer adjusts quantity to restore equality
5. Plot price vs. quantity → Demand curve

**Process**:
- Price decreases → MU/P increases
- Consumer buys more to decrease MU (diminishing MU)
- MU/P decreases back to equality
- Result: Lower price → Higher quantity (demand curve)

**Key insight**: The demand curve can be derived from utility maximization. Lower prices lead to higher consumption because consumers adjust to equalize MU per dollar.

## Lesson overview: Total utility and marginal utility

**Summary**:

**Total utility**: Total satisfaction from consumption. Increases with quantity but at decreasing rate.

**Marginal utility**: Additional satisfaction from one more unit. Decreases with quantity (law of diminishing marginal utility).

**Utility maximization**: Allocate budget so MU/P is equal for all goods. This maximizes total utility given budget constraint.

**Demand curve**: Can be derived from utility maximization. Shows how quantity demanded changes with price, based on consumer's attempt to equalize MU per dollar.

**Key insight**: Consumer theory explains how individuals make choices to maximize satisfaction given limited resources.`,
        importantPoints: [
          'Total utility increases with quantity but at decreasing rate',
          'Marginal utility decreases with quantity (law of diminishing MU)',
          'Utility maximization: MU/P equal for all goods',
          'Demand curve can be derived from utility maximization',
          'Consumers adjust consumption to equalize marginal utility per dollar',
        ],
      } as ArticleContent,
      {
        id: 'micro-u5-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Introduction to consumer theory; total utility and marginal utility',
        questions: [
          {
            id: 'quiz-5-1-1',
            question: 'If a good is free, when will a consumer stop wanting to buy the good?',
            options: [
              'When marginal utility is negative',
              'At the quantity where marginal utility is at its maximum',
              'Once marginal utility equals total utility',
              'Once the marginal utility equals zero',
              'Once the total utility equals zero',
            ],
            correctAnswer: 3,
            explanation: 'A consumer will stop wanting to buy a free good once the marginal utility equals zero. When a good is free (price = 0), a rational consumer will continue consuming until the marginal utility of the last unit consumed equals zero. At this point, consuming additional units would provide no additional satisfaction (or even negative satisfaction if marginal utility becomes negative), so the consumer stops. This is the point where total utility is maximized. If marginal utility is negative, the consumer would have already stopped consuming. Marginal utility equals total utility only at the first unit consumed, not at the optimal stopping point.',
          },
          {
            id: 'quiz-5-1-2',
            question: 'Which of the following best describes what consumers face when trying to make themselves as best off as possible?',
            options: [
              'Consumers combine inputs such that the marginal product per dollar spent is the same for all inputs',
              'Optimal consumption means spending whatever it takes to maximize utility',
              'Consumers minimize their total utility',
              'Scarcity exists for producers, but not for consumers',
              'Consumers face constraints and must make optimal decisions based on those constraints',
            ],
            correctAnswer: 4,
            explanation: 'Consumers face constraints and must make optimal decisions based on those constraints. When trying to maximize their well-being (utility), consumers operate under constraints such as limited income, time, and prices. They cannot simply spend unlimited amounts - they must make choices within their budget constraint. The optimal consumption decision involves maximizing utility subject to these constraints, typically by equalizing the marginal utility per dollar spent across all goods. Scarcity exists for both consumers and producers. Consumers do not minimize utility - they maximize it. The statement about combining inputs and marginal product applies to producers, not consumers.',
          },
          {
            id: 'quiz-5-1-3',
            question: 'How does the law of diminishing marginal utility help explain the law of demand?',
            options: [
              'When a good\'s price decreases, consumers will demand less of its substitutes and more of the good in question',
              'When the price of a good increases consumers will have less disposable income thus they\'ll demand less of the good in question',
              'Since each additional unit of a good provides less additional benefit, consumers will not be willing to pay as much for each additional unit',
              'Since additional units of a good cost more to produce, producer will only supply more if its price increases',
              'When a good\'s price decreases consumers demand increases because they value additional units more than those consumed before',
            ],
            correctAnswer: 2,
            explanation: 'The law of diminishing marginal utility explains the law of demand because since each additional unit of a good provides less additional benefit, consumers will not be willing to pay as much for each additional unit. As consumers consume more of a good, the marginal utility (additional satisfaction) from each successive unit decreases. This means consumers value additional units less than previous units. To induce consumers to buy more units, the price must be lower - they are only willing to pay less for units that provide less additional benefit. This creates the downward-sloping demand curve: lower prices are needed to encourage consumption of additional units that provide diminishing marginal utility. This is the fundamental connection between diminishing marginal utility and the law of demand.',
          },
        ],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-5-2',
    title: 'Utility maximization using marginal utility per dollar spent',
    duration: '30 min',
    contentItems: [
      {
        id: 'micro-u5-l2-video-1',
        type: 'video',
        title: 'Utility maximization using marginal utility per dollar spent',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u5-l2-article',
        type: 'article',
        title: 'Learn: Utility maximization using marginal utility per dollar spent',
        content: `# Utility maximization using marginal utility per dollar spent

## Utility maximization: equalizing marginal utility per dollar

**The rule**: Allocate budget so that marginal utility per dollar is equal for all goods consumed.

**Mathematical condition**: MUₐ / Pₐ = MUᵦ / Pᵦ = MUᶜ / Pᶜ = ...

**Why this maximizes utility**:
- If MUₐ/Pₐ > MUᵦ/Pᵦ, you get more utility per dollar from good A
- Buy more of A, less of B
- As you buy more A, MUₐ decreases (diminishing MU)
- As you buy less B, MUᵦ increases
- Continue until MUₐ/Pₐ = MUᵦ/Pᵦ

**Budget constraint**: Must also satisfy: Pₐ × Qₐ + Pᵦ × Qᵦ + ... = Budget

**Key insight**: Utility maximization requires both:
1. Equalizing MU/P across all goods
2. Spending entire budget (or as much as desired)

## Marginal utility free response example

**Example problem**:

Given:
- Budget: $20
- Good A: Price = $2, MU schedule: 1st = 20, 2nd = 16, 3rd = 12, 4th = 8
- Good B: Price = $4, MU schedule: 1st = 24, 2nd = 20, 3rd = 16, 4th = 12

**Step 1: Calculate MU/P for each unit**

Good A:
- 1st unit: MU/P = 20/2 = 10
- 2nd unit: MU/P = 16/2 = 8
- 3rd unit: MU/P = 12/2 = 6
- 4th unit: MU/P = 8/2 = 4

Good B:
- 1st unit: MU/P = 24/4 = 6
- 2nd unit: MU/P = 20/4 = 5
- 3rd unit: MU/P = 16/4 = 4

**Step 2: Rank by MU/P and allocate budget**

1. Good A, 1st unit: MU/P = 10, Cost = $2, Remaining = $18
2. Good A, 2nd unit: MU/P = 8, Cost = $2, Remaining = $16
3. Good B, 1st unit: MU/P = 6, Cost = $4, Remaining = $12
4. Good A, 3rd unit: MU/P = 6, Cost = $2, Remaining = $10
5. Good B, 2nd unit: MU/P = 5, Cost = $4, Remaining = $6
6. Good A, 4th unit: MU/P = 4, Cost = $2, Remaining = $4
7. Good B, 3rd unit: MU/P = 4, Cost = $4, Remaining = $0

**Step 3: Verify**

Final allocation:
- Good A: 4 units, MU = 8, MU/P = 4
- Good B: 3 units, MU = 16, MU/P = 4
- MU/P equal: ✓
- Budget spent: $2×4 + $4×3 = $20 ✓

**Key insight**: This method ensures utility maximization by always choosing the option with highest MU/P until budget is exhausted and MU/P is equalized.`,
        importantPoints: [
          'Utility maximization: MU/P equal for all goods',
          'Must satisfy budget constraint',
          'Rank options by MU/P and allocate budget accordingly',
          'Continue until budget exhausted and MU/P equalized',
          'This method guarantees maximum utility given budget',
        ],
      } as ArticleContent,
      {
        id: 'micro-u5-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Utility maximization using marginal utility per dollar spent',
        questions: [
          {
            id: 'quiz-5-2-1',
            question: 'Which of the following statements about rational decision-making is true?',
            options: [
              'Producers consider sunk costs, but consumers do not',
              'Consumers consider fixed costs, but producers do not',
              'A rational consumer\'s optimal quantity depends on previously determined fixed benefits',
              'A rational agent ignores sunk costs',
              'A rational producer bases their optimal quantity on fixed costs',
            ],
            correctAnswer: 3,
            explanation: 'A rational agent ignores sunk costs. Sunk costs are costs that have already been incurred and cannot be recovered. Rational decision-making focuses on marginal costs and marginal benefits going forward, not on costs that have already been paid. Both consumers and producers should ignore sunk costs when making optimal decisions. Fixed costs that are not yet incurred may be relevant, but sunk costs (already paid) should not influence future decisions. Rational agents make decisions based on future costs and benefits, not past expenditures.',
          },
          {
            id: 'quiz-5-2-2',
            question: 'What is the optimal quantity to consume of a good that is free?',
            options: [
              'It cannot be determined without a price',
              'The quantity where total utility from that good is maximized',
              'Any quantity that a person chooses will be optimal',
              'The entire amount of a good that exists',
              'Nothing, since the good is free',
            ],
            correctAnswer: 1,
            explanation: 'The optimal quantity to consume of a free good is the quantity where total utility from that good is maximized. When a good is free (price = 0), a rational consumer will continue consuming until marginal utility equals zero. At this point, consuming one more unit would provide no additional satisfaction (or negative satisfaction), so total utility is maximized. This is the point where the consumer has extracted all possible utility from the good. The optimal quantity can be determined by finding where marginal utility equals zero, which maximizes total utility.',
          },
          {
            id: 'quiz-5-2-3',
            question: 'Annabelle paid a $20 admission fee to get into a carnival and is deciding on the best way to spend her money on ferris wheel rides and corn dogs. If she is acting rationally, which of the following does NOT factor into her decision making?',
            options: [
              'The marginal benefit of one more corn dog',
              'The additional happiness she gets from one more corn dog',
              'How much money she has left',
              'The price of ferris wheel rides',
              'The $20 admission fee',
            ],
            correctAnswer: 4,
            explanation: 'The $20 admission fee does NOT factor into her decision making. The admission fee is a sunk cost - it has already been paid and cannot be recovered. Rational decision-making focuses on future costs and benefits, not past expenditures. Annabelle should make her decisions based on: the marginal benefit of additional corn dogs, the marginal utility (happiness) from additional units, how much money she has left (her remaining budget constraint), and the prices of the goods she can still purchase. The admission fee, being a sunk cost, should be ignored when deciding how to allocate her remaining money.',
          },
          {
            id: 'quiz-5-2-4',
            question: 'Which of the following equations would represent optimal combination for a utility maximizing consumer deciding how much to buy of three goods, X, Y, and Z?',
            options: [
              'MU_X / P_X = MU_Y / P_Y = MU_Z / P_Z',
              'MU_X = MU_Y = MU_Z',
              'P_X = P_Y = P_Z',
              'MU_X × P_X = MU_Y × P_Y = MU_Z × P_Z',
              'ΔTU_X / ΔQ_X = ΔTU_Y / ΔQ_Y = ΔTU_Z / ΔP_Z',
            ],
            correctAnswer: 0,
            explanation: 'The optimal combination for a utility-maximizing consumer is represented by MU_X / P_X = MU_Y / P_Y = MU_Z / P_Z. This is the equimarginal principle: consumers maximize utility by equalizing the marginal utility per dollar spent across all goods. When MU/P is equal for all goods, the consumer cannot increase total utility by reallocating spending - any shift would reduce utility. This condition ensures that the last dollar spent on each good provides the same marginal utility, which is the utility-maximizing allocation. The other options are incorrect: equal marginal utilities (B) ignores prices, equal prices (C) ignores utility, and the product form (D) doesn\'t represent the optimal condition.',
          },
        ],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-5-3',
    title: 'Utility maximization with indifference curves',
    duration: '40 min',
    contentItems: [
      {
        id: 'micro-u5-l3-video-1',
        type: 'video',
        title: 'Utility maximization with indifference curves',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u5-l3-article',
        type: 'article',
        title: 'Learn: Utility maximization with indifference curves',
        content: `# Utility maximization with indifference curves

## Budget line

**Budget line** (budget constraint) shows all combinations of two goods that can be purchased with a given budget.

**Equation**: Pₐ × Qₐ + Pᵦ × Qᵦ = Budget

**Properties**:
- Linear (if prices constant)
- Slope = -Pₐ / Pᵦ (price ratio)
- Intercepts: Budget/Pₐ (if Qᵦ = 0) and Budget/Pᵦ (if Qₐ = 0)

**Graphical representation**:
- Y-axis: Quantity of good B
- X-axis: Quantity of good A
- Downward sloping line
- Points on line: Spend entire budget
- Points below line: Don't spend all budget (affordable but not optimal)
- Points above line: Unaffordable

**Key insight**: The budget line shows the trade-off between goods given prices and income.

## Indifference curves and marginal rate of substitution

**Indifference curve**: Shows all combinations of two goods that give the same level of utility (satisfaction).

**Properties**:
- Downward sloping (to maintain same utility, must give up one good to get more of other)
- Convex to origin (diminishing marginal rate of substitution)
- Higher curves = Higher utility
- Curves don't intersect

**Marginal rate of substitution (MRS)**:
- Rate at which consumer is willing to substitute one good for another
- Slope of indifference curve (absolute value)
- MRS = MUₐ / MUᵦ
- Decreases as move down curve (diminishing MRS)

**Why convex?**:
- As you have more of good A, willing to give up less of good B for another unit of A
- Diminishing marginal utility makes this happen

**Key insight**: Indifference curves show consumer preferences. MRS shows willingness to trade between goods.

## Optimal point on budget line

**Utility maximization** occurs where:
- Indifference curve is tangent to budget line
- MRS = Price ratio (Pₐ / Pᵦ)
- MUₐ / MUᵦ = Pₐ / Pᵦ
- Which rearranges to: MUₐ / Pₐ = MUᵦ / Pᵦ

**Why this is optimal**:
- At tangency, highest indifference curve possible
- Any other point on budget line is on lower indifference curve
- Consumer can't reach higher utility given budget

**Graphical representation**:
- Budget line and indifference curve tangent
- Point of tangency = Optimal consumption bundle
- Slope of budget line = Slope of indifference curve

**Key insight**: The optimal point is where the consumer's willingness to substitute (MRS) equals the market's rate of exchange (price ratio).

## Types of indifference curves

**Normal goods** (standard case):
- Downward sloping, convex
- Both goods are normal
- Standard shape

**Perfect substitutes**:
- Straight line (constant MRS)
- Consumer willing to substitute at constant rate
- Example: Different brands of same product

**Perfect complements**:
- L-shaped (right angle)
- Goods used in fixed proportions
- Example: Left and right shoes, coffee and cream (for some)

**One good is a "bad"**:
- Upward sloping
- More of "bad" requires more of good to maintain utility
- Example: Pollution and consumption

**Key insight**: Different preferences lead to different indifference curve shapes.

## Decisions within a budget constraint

**Consumer choice problem**:
- Given: Budget, prices, preferences (indifference curves)
- Find: Optimal consumption bundle

**Solution process**:
1. Draw budget line (given prices and budget)
2. Draw indifference curves (given preferences)
3. Find point of tangency
4. This is optimal bundle

**Effects of changes**:

**Price change**:
- Budget line rotates
- New tangency point
- Can derive demand curve

**Income change**:
- Budget line shifts (parallel)
- New tangency point
- Can derive income-consumption curve

**Preference change**:
- Indifference curves change shape
- New tangency point
- Consumption changes

**Key insight**: Consumer choice depends on budget, prices, and preferences. Changes in any of these affect optimal consumption.`,
        importantPoints: [
          'Budget line shows affordable combinations given prices and income',
          'Indifference curves show combinations giving same utility',
          'Optimal point: tangency of budget line and indifference curve',
          'At optimum: MRS = price ratio (MUₐ/MUᵦ = Pₐ/Pᵦ)',
          'Different preferences lead to different indifference curve shapes',
        ],
      } as ArticleContent,
    ],
  },
];

const unit6Lessons: Lesson[] = [
  {
    id: 'lesson-6-1',
    title: 'Introduction to production and costs',
    duration: '25 min',
    contentItems: [
      {
        id: 'micro-u6-l1-video-1',
        type: 'video',
        title: 'Introduction to production and costs',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u6-l1-article',
        type: 'article',
        title: 'Learn: Introduction to production and costs',
        content: `# Introduction to production and costs

## Introduction to production functions

**Production function** shows the relationship between inputs (factors of production) and output (quantity produced).

**Formula**: Q = f(L, K, ...)

Where:
- Q = Quantity of output
- L = Labor (variable input)
- K = Capital (often fixed in short run)
- Other inputs as needed

**Key concepts**:
- **Inputs**: Resources used in production (labor, capital, materials)
- **Output**: Goods or services produced
- **Technology**: Methods of production (affects the function)

**Short run vs. long run**:
- **Short run**: At least one input is fixed (usually capital)
- **Long run**: All inputs are variable

**Key insight**: Production functions show how firms transform inputs into outputs, constrained by technology.

## Total product, marginal product, and average product

**Total product (TP)**: Total quantity of output produced with given inputs.

**Marginal product (MP)**: Additional output from one more unit of input.

**Formula**: MP = ΔTP / ΔL (for labor)

**Average product (AP)**: Output per unit of input.

**Formula**: AP = TP / L (for labor)

**Law of diminishing marginal returns**:
- As more of a variable input is added (with fixed inputs), marginal product eventually decreases
- Initially, MP may increase (specialization)
- Eventually, MP decreases (overcrowding, fixed inputs constrain production)

**Relationships**:
- When MP > AP, AP increases
- When MP < AP, AP decreases
- When MP = AP, AP is at maximum
- MP is the slope of TP curve

**Key insight**: Understanding these relationships helps firms determine optimal input levels and understand cost structures.`,
        importantPoints: [
          'Production function shows relationship between inputs and output',
          'Total product: total output; Marginal product: additional output per input',
          'Average product: output per unit of input',
          'Law of diminishing returns: MP eventually decreases',
          'MP and AP relationships determine optimal input levels',
        ],
      } as ArticleContent,
      {
        id: 'micro-u6-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Introduction to production and costs',
        questions: [
          {
            id: 'quiz-6-1-1',
            question: 'Frenz Bakery is a large scale bakery that produces bread, hamburger buns, and donuts. Which of the following is most likely to be an input that can be adjusted in the long run, but not the short run?',
            options: [
              'The electricity used to operate the ovens',
              'The number of sesame seeds on hamburger buns.',
              'The building used as a bakery.',
              'The flour used to bake hamburger buns',
              'The workers in the bakery.',
            ],
            correctAnswer: 2,
            explanation: 'The building used as a bakery is most likely an input that can be adjusted in the long run, but not the short run. In economics, the short run is a period where at least one input (typically capital, like buildings and equipment) is fixed. The long run is a period where all inputs are variable - firms can adjust plant size, buildings, and all other inputs. Buildings are typically fixed in the short run (they take time and significant investment to change) but can be expanded, contracted, or relocated in the long run. Electricity, flour, and workers can typically be adjusted in the short run. The number of sesame seeds is a very minor input that could be adjusted quickly.',
          },
          {
            id: 'quiz-6-1-2',
            question: 'All Quiet on the Western Bundt is a bakery specializing in the production of bundt cakes using a combination of labor and capital. If the firm increases its capital and decreases its labor and produces the same amount of bundt cakes, what happens to the marginal product of capital (MPK) and the marginal product of labor (MPL)?',
            options: [
              'MPK doesn\'t change; MPL decreases',
              'MPK decreases; MPL increases',
              'MPK decreases; MPL doesn\'t change',
              'MPK increases; MPL doesn\'t change',
              'MPK increases; MPL decreases',
            ],
            correctAnswer: 1,
            explanation: 'When the firm increases capital and decreases labor while producing the same output, MPK decreases and MPL increases. This follows from the law of diminishing marginal returns: as more of an input is used (holding other inputs constant), its marginal product eventually decreases. When capital increases, there is more capital per unit of labor, so the marginal product of capital decreases (diminishing returns to capital). When labor decreases, there is less labor per unit of capital, so the marginal product of labor increases (each remaining worker has more capital to work with, making them more productive). This is consistent with moving along an isoquant - as you substitute capital for labor, the marginal product of the input being increased decreases, and the marginal product of the input being decreased increases.',
          },
          {
            id: 'quiz-6-1-3',
            question: 'Which of the following is a way to avoid diminishing marginal returns to labor?',
            options: [
              'Increase the population',
              'Increase the amount of labor used',
              'Increase the quantity of capital',
              'Reduce the amount of natural resources available',
              'Reduce the size of plant and equipment',
            ],
            correctAnswer: 2,
            explanation: 'Increasing the quantity of capital is a way to avoid diminishing marginal returns to labor. Diminishing marginal returns to labor occur when additional workers are added to a fixed amount of capital - each new worker has less capital to work with, so their marginal product decreases. By increasing capital (machinery, equipment, tools), you give workers more resources to work with, which can offset or prevent diminishing returns. This shifts the production function upward. Increasing the amount of labor used (B) would actually lead to diminishing returns if capital is fixed. Increasing population (A) doesn\'t directly address the capital-labor ratio. Reducing resources (D) or plant size (E) would worsen the situation.',
          },
          {
            id: 'quiz-6-1-4',
            question: 'When Priya added one more worker, she noticed that her average product of labor (APL) increased, and if she adds yet another worker her APL increases again. What MUST also be true about the marginal product of labor (MPL) based on this information?',
            options: [
              'MPL is less than APL.',
              'MPL equals zero.',
              'MPL is negative.',
              'MPL equals APL.',
              'MPL is greater than APL.',
            ],
            correctAnswer: 4,
            explanation: 'When APL is increasing, MPL must be greater than APL. This is a fundamental relationship in production theory: when the marginal product is greater than the average product, the average product increases. Think of it like test scores: if your new test score (marginal) is higher than your current average, your average goes up. Similarly, if MPL > APL, adding another worker pulls the average up. If MPL < APL, the average would decrease. If MPL = APL, the average would stay constant. Since APL is increasing in this scenario, MPL must be greater than APL.',
          },
        ],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-6-2',
    title: 'Production and costs in the short run',
    duration: '50 min',
    contentItems: [
      {
        id: 'micro-u6-l2-video-1',
        type: 'video',
        title: 'Production and costs in the short run',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u6-l2-article',
        type: 'article',
        title: 'Learn: Production and costs in the short run',
        content: `# Production and costs in the short run

## Fixed, variable, and marginal cost

**Fixed costs (FC)**: Costs that don't vary with output (in short run).

**Examples**: Rent, insurance, equipment (if already owned)

**Variable costs (VC)**: Costs that vary with output.

**Examples**: Labor, materials, utilities

**Total cost (TC)**: TC = FC + VC

**Marginal cost (MC)**: Additional cost of producing one more unit.

**Formula**: MC = ΔTC / ΔQ = ΔVC / ΔQ (since FC doesn't change)

**Key relationships**:
- FC is constant (horizontal line)
- VC increases with output
- TC = FC + VC (parallel to VC, shifted up by FC)
- MC is the slope of TC and VC curves

## Marginal cost, average variable cost, and average total cost

**Average variable cost (AVC)**: Variable cost per unit.

**Formula**: AVC = VC / Q

**Average total cost (ATC)**: Total cost per unit.

**Formula**: ATC = TC / Q = AFC + AVC

**Average fixed cost (AFC)**: Fixed cost per unit.

**Formula**: AFC = FC / Q (decreases as Q increases)

**Marginal cost (MC)**:
- MC = ΔTC / ΔQ
- Slope of TC curve
- Usually U-shaped (decreases then increases)

**Key relationships**:
- When MC < AVC, AVC decreases
- When MC > AVC, AVC increases
- When MC = AVC, AVC is at minimum
- Same relationships hold for ATC

## Graphs of MC, AVC, and ATC

**Typical cost curves**:

**MC curve**:
- U-shaped
- Intersects AVC and ATC at their minimums
- Below AVC/ATC when they're decreasing
- Above AVC/ATC when they're increasing

**AVC curve**:
- U-shaped
- Minimum where MC = AVC
- Increases as Q increases (after minimum)

**ATC curve**:
- U-shaped
- Minimum where MC = ATC
- Always above AVC (by AFC)
- Gets closer to AVC as Q increases (AFC decreases)

**AFC curve**:
- Always decreasing (hyperbola)
- Approaches zero as Q increases

**Key insight**: MC determines the shape of AVC and ATC. MC intersects both at their minimums.

## Marginal revenue and marginal cost

**Marginal revenue (MR)**: Additional revenue from selling one more unit.

**Marginal cost (MC)**: Additional cost of producing one more unit.

**Profit maximization rule**: Produce where MR = MC.

**Why**:
- If MR > MC, profit increases by producing more
- If MR < MC, profit decreases (should produce less)
- If MR = MC, profit is maximized

**Key insight**: Firms maximize profit by producing where marginal revenue equals marginal cost.

## Marginal revenue below average total cost

**When MR < ATC**:
- Firm is making economic loss
- But may still produce in short run
- Decision depends on whether to shut down

**Shut-down rule**:
- If P < AVC: Shut down (can't cover variable costs)
- If P > AVC: Continue producing (can cover variable costs, minimize loss)

**Key insight**: Even when making a loss, firms may continue producing if they can cover variable costs.

## How costs change when fixed and variable costs change

**Increase in fixed costs**:
- FC curve shifts up
- TC curve shifts up (parallel)
- ATC increases
- MC and AVC unchanged (they don't depend on FC)

**Increase in variable costs**:
- VC curve shifts up
- TC curve shifts up
- MC, AVC, and ATC all increase

**Key insight**: Fixed cost changes affect ATC but not MC. Variable cost changes affect all cost measures.

## Graphical impact of cost changes on marginal and average costs

**Fixed cost increase**:
- Shifts ATC up
- MC and AVC unchanged
- Minimum ATC occurs at same quantity

**Variable cost increase**:
- Shifts MC, AVC, and ATC up
- May change minimum points
- Affects production decisions

**Key insight**: Understanding how cost changes affect curves helps analyze firm behavior.

## Visualizing average costs and marginal costs as slope

**Marginal cost as slope**:
- MC is the slope of TC (or VC) curve
- Steep TC curve → High MC
- Flat TC curve → Low MC

**Average cost as slope**:
- ATC is the slope of line from origin to point on TC curve
- Steep line → High ATC
- Shallow line → Low ATC

**At minimum ATC**:
- Slope of TC = Slope of line from origin
- MC = ATC

**Key insight**: Geometric relationships help visualize cost concepts.

## The structure of costs in the short run

**Summary**:

**Fixed costs**: Don't vary with output (in short run).

**Variable costs**: Vary with output.

**Total costs**: FC + VC.

**Marginal cost**: Additional cost per unit (slope of TC).

**Average costs**: Cost per unit (ATC, AVC, AFC).

**Key relationships**:
- MC intersects AVC and ATC at minimums
- MC determines shape of average curves
- AFC always decreases
- ATC = AFC + AVC

**Key insight**: Understanding cost structure is essential for production and pricing decisions.`,
        importantPoints: [
          'Fixed costs don\'t vary with output; variable costs do',
          'MC is slope of TC curve; intersects AVC and ATC at minimums',
          'Profit maximization: MR = MC',
          'Shut-down rule: produce if P > AVC',
          'Fixed cost changes affect ATC; variable cost changes affect all costs',
        ],
      } as ArticleContent,
      {
        id: 'micro-u6-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Production and costs in the short run',
        questions: [
          {
            id: 'quiz-6-2-1',
            question: 'Which of the following best describes average total cost?',
            options: [
              'The cost of producing a typical unit of output',
              'The costs that do not vary as output changes',
              'The costs that do not vary as output changes, per unit of output',
              'The cost of producing one more unit of output',
              'The costs that vary as output changes, per unit of output',
            ],
            correctAnswer: 0,
            explanation: 'Average total cost (ATC) is the cost of producing a typical unit of output. It is calculated as total cost divided by quantity of output (ATC = TC/Q). ATC represents the average cost per unit, including both fixed and variable costs. It tells us how much it costs, on average, to produce each unit of output. The costs that do not vary as output changes describes fixed costs (FC). Fixed costs per unit would be average fixed cost (AFC). The cost of producing one more unit describes marginal cost (MC). The costs that vary per unit describes average variable cost (AVC).',
          },
          {
            id: 'quiz-6-2-2',
            question: 'Assume that a firm\'s only variable input is labor and a new tax has been placed on labor. Which of the following correctly describes the impact on each of: the marginal cost curve (MC), the average variable cost curve (AVC), average total cost curve (ATC), and average fixed cost curve (AFC)?',
            options: [
              'MC shifts up; AVC shifts up; ATC shifts up; AFC doesn\'t change.',
              'MC doesn\'t change; AVC doesn\'t change; ATC shifts up; AFC doesn\'t change.',
              'MC shifts up; AVC doesn\'t change; ATC doesn\'t change; AFC doesn\'t change.',
              'MC doesn\'t change; AVC shifts up; ATC shifts up; AFC doesn\'t change.',
              'MC doesn\'t change; AVC doesn\'t change; ATC shifts up; AFC shifts up.',
            ],
            correctAnswer: 0,
            explanation: 'A tax on labor (the only variable input) increases the cost of variable inputs. This causes MC to shift up (the cost of producing one more unit increases), AVC to shift up (variable costs per unit increase), and ATC to shift up (since ATC = AFC + AVC, and AVC increases). AFC doesn\'t change because fixed costs are unaffected by a tax on labor (a variable input). The tax only affects variable costs, so all cost curves that include variable costs (MC, AVC, ATC) shift upward, while AFC remains unchanged.',
          },
          {
            id: 'quiz-6-2-3',
            question: 'Assume there is a range of output over which there are gains from specialization and the division of labor. What must be true if average variable costs (AVC) are increasing?',
            options: [
              'Marginal costs (MC) equals average total costs (ATC).',
              'Average total costs (ATC) must be increasing.',
              'As the amount of output increases, average total cost (ATC) and AVC get farther apart.',
              'Marginal costs (MC) must be greater than AVC.',
              'Marginal costs (MC) must be decreasing.',
            ],
            correctAnswer: 3,
            explanation: 'If average variable costs (AVC) are increasing, marginal costs (MC) must be greater than AVC. This follows from the same mathematical relationship as with average and marginal product: when an average is increasing, the marginal must be greater than the average. If MC > AVC, adding another unit pulls the average up. If MC < AVC, the average would decrease. If MC = AVC, the average would stay constant. Since AVC is increasing, MC must be above AVC. This is true regardless of whether there are gains from specialization - even if AVC initially decreases due to specialization, once it starts increasing, MC must be greater than AVC.',
          },
        ],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-6-3',
    title: 'Production and costs in the long run',
    duration: '35 min',
    contentItems: [
      {
        id: 'micro-u6-l3-video-1',
        type: 'video',
        title: 'Production and costs in the long run',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u6-l3-article',
        type: 'article',
        title: 'Learn: Production and costs in the long run',
        content: `# Production and costs in the long run

## Long-run average total cost curve

**Long run**: All inputs are variable (no fixed costs).

**Long-run average total cost (LRATC)**: Lowest average cost for each output level (after adjusting all inputs).

**Shape**: U-shaped or L-shaped.

**Relationship to short-run curves**:
- LRATC is the envelope of all short-run ATC curves
- Each point on LRATC is tangent to a short-run ATC curve
- Shows minimum cost for each output level

**Key insight**: LRATC shows the lowest possible average cost for each output level when all inputs can be adjusted.

## Economies and diseconomies of scale

**Economies of scale**: Average cost decreases as output increases.

**Causes**:
- Specialization and division of labor
- Better use of capital
- Bulk purchasing discounts
- Spreading fixed costs
- Learning by doing

**Diseconomies of scale**: Average cost increases as output increases.

**Causes**:
- Coordination problems
- Communication difficulties
- Bureaucracy
- Management challenges

**Constant returns to scale**: Average cost constant as output increases.

**Key insight**: Scale affects costs. Firms seek economies of scale but must avoid diseconomies.

## Minimum efficient scale and market concentration

**Minimum efficient scale (MES)**: Smallest output level where LRATC is minimized.

**Significance**:
- Below MES: Not operating at lowest cost
- At or above MES: Operating efficiently
- Large MES relative to market → Few firms (concentrated market)
- Small MES relative to market → Many firms (competitive market)

**Market concentration**:
- If MES is large relative to market size → Few firms can operate efficiently
- Leads to oligopoly or monopoly
- If MES is small relative to market size → Many firms can operate efficiently
- Leads to perfect competition

**Key insight**: MES affects market structure. Large MES relative to market leads to concentration.

## The structure of costs in the long run

**Summary**:

**Long run**: All inputs variable, no fixed costs.

**LRATC**: Envelope of short-run ATC curves, shows minimum cost for each output.

**Economies of scale**: Decreasing LRATC (increasing returns to scale).

**Diseconomies of scale**: Increasing LRATC (decreasing returns to scale).

**Constant returns to scale**: Constant LRATC.

**Minimum efficient scale**: Output where LRATC is minimized.

**Key insight**: Long-run costs determine optimal firm size and market structure.`,
        importantPoints: [
          'Long run: all inputs variable, no fixed costs',
          'LRATC is envelope of short-run ATC curves',
          'Economies of scale: decreasing LRATC',
          'Diseconomies of scale: increasing LRATC',
          'Minimum efficient scale affects market structure',
        ],
      } as ArticleContent,
      {
        id: 'micro-u6-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Production and costs in the long run',
        questions: [
          {
            id: 'quiz-6-3-1',
            question: 'What is a firm experiencing if it quadruples all of its inputs but its output doubles?',
            options: [
              'increasing returns to scale',
              'decreasing returns to scale',
              'constant returns to scale',
              'diminishing returns to a single input',
              'economies of scale',
            ],
            correctAnswer: 1,
            explanation: 'The firm is experiencing decreasing returns to scale. When all inputs are quadrupled (increased by 4x) but output only doubles (increases by 2x), output increases proportionally less than inputs. This is decreasing returns to scale - the firm becomes less efficient as it scales up. With decreasing returns to scale, long-run average total cost increases as output increases. Increasing returns to scale would occur if output increased more than proportionally to inputs. Constant returns to scale would occur if output increased proportionally to inputs (e.g., 4x inputs → 4x output).',
          },
          {
            id: 'quiz-6-3-2',
            question: 'With which of the following is a high minimum efficient scale associated?',
            options: [
              'high average variable costs',
              'absence of barriers to entry',
              'strongly increasing short-run average costs',
              'very high fixed costs',
              'very high and rapidly increasing marginal costs',
            ],
            correctAnswer: 3,
            explanation: 'A high minimum efficient scale is associated with very high fixed costs. Minimum efficient scale (MES) is the smallest output level at which a firm can minimize its long-run average total cost. When fixed costs are very high, firms need to produce a large quantity of output to spread those fixed costs over many units, achieving low average total cost. This means the MES is high - firms must operate at a large scale to be efficient. High fixed costs create economies of scale that require large-scale production. The absence of barriers to entry (B) would actually make it easier for small firms to enter, suggesting lower MES. High average variable costs or marginal costs don\'t directly relate to MES.',
          },
          {
            id: 'quiz-6-3-3',
            question: 'Sesi uses capital and labor in the production of cakes. When Sesi doubled the capital and labor she used, she produced twice as many cakes. What did Sesi experience?',
            options: [
              'increasing returns to scale',
              'coordination costs',
              'constant returns to scale',
              'diminishing returns',
              'decreasing returns to scale',
            ],
            correctAnswer: 2,
            explanation: 'Sesi experienced constant returns to scale. When she doubled all inputs (capital and labor) and output doubled proportionally (2x inputs → 2x output), this represents constant returns to scale. The firm\'s efficiency remains constant as it scales up - output increases in the same proportion as inputs. With constant returns to scale, long-run average total cost remains constant as output increases. Increasing returns to scale would occur if output more than doubled (e.g., 2x inputs → 3x output). Decreasing returns to scale would occur if output less than doubled (e.g., 2x inputs → 1.5x output).',
          },
        ],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-6-4',
    title: 'Types of profit',
    duration: '30 min',
    contentItems: [
      {
        id: 'micro-u6-l4-video-1',
        type: 'video',
        title: 'Types of profit',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u6-l4-article',
        type: 'article',
        title: 'Learn: Types of profit',
        content: `# Types of profit

## Economic profit vs accounting profit

**Accounting profit**: Revenue - Explicit costs.

**Explicit costs**: Actual payments for inputs (wages, materials, rent).

**Economic profit**: Revenue - Total opportunity cost (explicit + implicit costs).

**Implicit costs**: Opportunity costs of using own resources (forgone wages, forgone interest on own capital).

**Key difference**:
- Accounting profit > Economic profit (ignores implicit costs)
- Economic profit accounts for all opportunity costs

**Example**:
- Revenue: $100,000
- Explicit costs: $80,000
- Accounting profit: $20,000
- Implicit costs (forgone salary): $25,000
- Economic profit: -$5,000 (economic loss)

**Key insight**: Economic profit is the true measure of profitability, accounting for all opportunity costs.

## Depreciation and opportunity cost of capital

**Depreciation**: Decline in value of capital over time.

**Accounting treatment**: Depreciation expense reduces accounting profit.

**Economic treatment**: Opportunity cost of capital (what capital could earn elsewhere).

**Key concepts**:
- **Explicit cost**: Actual depreciation expense
- **Implicit cost**: Forgone return on capital
- Economic profit uses opportunity cost, not just depreciation

**Key insight**: Economic analysis uses opportunity cost of capital, not just accounting depreciation.

## Long-run supply curve and economic profit

**Perfect competition long run**:
- Economic profit = 0 (normal profit)
- Firms enter if economic profit > 0
- Firms exit if economic profit < 0
- Entry/exit continues until economic profit = 0

**Long-run supply curve**:
- Horizontal if constant costs (constant LRATC)
- Upward sloping if increasing costs
- Downward sloping if decreasing costs (rare)

**Key insight**: In long-run competitive equilibrium, economic profit is zero. Firms earn normal profit (accounting profit = opportunity cost).

## Explicit and implicit costs and accounting and economic profit

**Explicit costs**: Actual out-of-pocket payments.
- Wages, rent, materials, utilities
- Recorded in accounting books

**Implicit costs**: Opportunity costs of using own resources.
- Forgone salary (if owner works in business)
- Forgone interest (on own capital)
- Forgone rent (on own building)

**Accounting profit**:
- Revenue - Explicit costs
- What appears on financial statements
- Can be positive even with economic loss

**Economic profit**:
- Revenue - (Explicit + Implicit costs)
- True measure of profitability
- Accounts for all opportunity costs
- Zero in long-run competitive equilibrium

**Key insight**: Understanding the difference between accounting and economic profit is crucial for decision-making.`,
        importantPoints: [
          'Accounting profit = Revenue - Explicit costs',
          'Economic profit = Revenue - Total opportunity cost',
          'Implicit costs are opportunity costs of own resources',
          'Economic profit accounts for all opportunity costs',
          'Long-run competitive equilibrium: economic profit = 0',
        ],
      } as ArticleContent,
      {
        id: 'micro-u6-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Types of profit',
        questions: [
          {
            id: 'quiz-6-4-1',
            question: 'All of the following are included in the calculation of accounting profit EXCEPT which of option?',
            options: [
              'variable costs',
              'total revenue',
              'implicit costs',
              'fixed costs',
              'explicit costs',
            ],
            correctAnswer: 2,
            explanation: 'Implicit costs are NOT included in the calculation of accounting profit. Accounting profit = Total Revenue - Explicit Costs. Explicit costs include all actual monetary payments such as variable costs, fixed costs, wages, materials, rent, etc. Implicit costs are opportunity costs that don\'t involve actual cash payments (e.g., foregone salary, foregone interest on owner\'s capital). Economic profit = Total Revenue - Explicit Costs - Implicit Costs. Since accounting profit only subtracts explicit costs, implicit costs are excluded from accounting profit calculations.',
          },
          {
            id: 'quiz-6-4-2',
            question: 'Which of the following best describes what a firm\'s objective is?',
            options: [
              'Minimize total costs',
              'Maximize total revenue',
              'maximize accounting profit',
              'maximize economic profit',
              'Maximize total utility',
            ],
            correctAnswer: 3,
            explanation: 'A firm\'s objective is to maximize economic profit. Economic profit accounts for all opportunity costs, including both explicit and implicit costs. Firms make decisions to maximize economic profit because it represents the true economic return after considering all alternatives. While firms may also care about accounting profit for tax and reporting purposes, the fundamental economic objective is to maximize economic profit. Minimizing costs or maximizing revenue alone don\'t guarantee maximum profit. Maximizing total utility is a consumer objective, not a firm objective.',
          },
          {
            id: 'quiz-6-4-3',
            question: 'In 2018, Arctic Enterprises produced and sold 500 sleds in a competitive market at a price of $100 each. The cost of materials and labor was $7,000. The opportunity cost of capital was $10,000 and the opportunity cost of the entrepreneur\'s time was $40,000. What is Arctic Enterprises\' economic profit?',
            options: [
              '$33,000',
              '-$7,000',
              '$31,000',
              '$3,000',
              '$43,000',
            ],
            correctAnswer: 1,
            explanation: 'Arctic Enterprises\' economic profit is -$7,000. Economic profit = Total Revenue - Explicit Costs - Implicit Costs. Total Revenue = 500 sleds × $100 = $50,000. Explicit Costs = $7,000 (materials and labor). Implicit Costs = $10,000 (opportunity cost of capital) + $40,000 (opportunity cost of entrepreneur\'s time) = $50,000. Economic Profit = $50,000 - $7,000 - $50,000 = -$7,000. The firm is earning negative economic profit, meaning it would be better off using its resources elsewhere.',
          },
          {
            id: 'quiz-6-4-4',
            question: 'A firm produces 200 pies and sells each pie for $20. The explicit cost of making the pies is $2000. Additionally, the opportunity cost of the firm\'s owner is $1000, and the building the firm is in could be rented to someone else for $700. What is this firm\'s economic profit?',
            options: [
              '$2000',
              '$1000',
              '$1300',
              '$300',
              '$4000',
            ],
            correctAnswer: 3,
            explanation: 'The firm\'s economic profit is $300. Economic profit = Total Revenue - Explicit Costs - Implicit Costs. Total Revenue = 200 pies × $20 = $4,000. Explicit Costs = $2,000. Implicit Costs = $1,000 (opportunity cost of owner\'s time) + $700 (opportunity cost of building/foregone rent) = $1,700. Economic Profit = $4,000 - $2,000 - $1,700 = $300. The firm is earning positive economic profit, meaning it is doing better than the next best alternative use of its resources.',
          },
        ],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-6-5',
    title: 'Profit maximization',
    duration: '30 min',
    contentItems: [
      {
        id: 'micro-u6-l5-video-1',
        type: 'video',
        title: 'Profit maximization',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u6-l5-article',
        type: 'article',
        title: 'Learn: Profit maximization',
        content: `# Profit maximization

## Profit maximization

**Profit**: π = TR - TC

Where:
- TR = Total revenue = P × Q
- TC = Total cost

**Profit maximization rule**: Produce where MR = MC.

**Why**:
- If MR > MC: Producing more increases profit
- If MR < MC: Producing less increases profit (or reduces loss)
- If MR = MC: Profit is maximized (or loss minimized)

**Graphical representation**:
- Find Q where MR = MC
- Price from demand curve at that Q
- Profit = (P - ATC) × Q
- Or: Profit = TR - TC

**Key insight**: Firms maximize profit by producing where marginal revenue equals marginal cost.

## Profit maximization worked example

**Example**:

Given:
- Demand: P = 100 - Q
- Cost: TC = 50 + 10Q + Q²
- Find profit-maximizing output and price

**Step 1: Find MR**
- TR = P × Q = (100 - Q) × Q = 100Q - Q²
- MR = dTR/dQ = 100 - 2Q

**Step 2: Find MC**
- MC = dTC/dQ = 10 + 2Q

**Step 3: Set MR = MC**
- 100 - 2Q = 10 + 2Q
- 90 = 4Q
- Q = 22.5

**Step 4: Find price**
- P = 100 - Q = 100 - 22.5 = 77.5

**Step 5: Calculate profit**
- TR = 77.5 × 22.5 = 1,743.75
- TC = 50 + 10(22.5) + (22.5)² = 50 + 225 + 506.25 = 781.25
- Profit = 1,743.75 - 781.25 = 962.5

**Key insight**: This systematic approach finds the profit-maximizing output and price.`,
        importantPoints: [
          'Profit maximization: MR = MC',
          'If MR > MC, produce more; if MR < MC, produce less',
          'Profit = (P - ATC) × Q or TR - TC',
          'Systematic approach: find MR, MC, set equal, find Q and P',
        ],
      } as ArticleContent,
      {
        id: 'micro-u6-l5-quiz',
        type: 'quiz',
        title: 'Quiz: Profit maximization',
        questions: [
          {
            id: 'quiz-6-5-1',
            question: 'Which of the following best describes a firm\'s profit maximization rule?',
            options: [
              'produce the quantity where price exceeds average variable cost by the greatest amount.',
              'produce the quantity where marginal revenue exceeds marginal cost by the greatest amount.',
              'produce the quantity where marginal cost equals marginal revenue',
              'produce the quantity where price is equal to the average total cost',
              'Produce the quantity where average variable cost equals average total cost',
            ],
            correctAnswer: 2,
            explanation: 'A firm\'s profit maximization rule is to produce the quantity where marginal cost equals marginal revenue (MC = MR). At this point, the firm maximizes profit (or minimizes loss). If MR > MC, producing one more unit adds more to revenue than to cost, so profit increases. If MR < MC, producing one more unit adds more to cost than to revenue, so profit decreases. Therefore, profit is maximized where MR = MC. This rule applies regardless of market structure. The other options don\'t represent the profit maximization condition.',
          },
          {
            id: 'quiz-6-5-2',
            question: 'Yuk\'s Ukuleles is a firm that produces ukuleles in a competitive market. Currently, its profits are negative, but its profits are the highest this firm can earn given the current price of ukuleles. Which of the following correctly describes this firm\'s current status?',
            options: [
              'P < ATC(Q) and MR(Q) > MC(Q)',
              'P < ATC(Q) and MR(Q) = MC(Q)',
              'P = ATC(Q) and MR(Q) < MC(Q)',
              'P < ATC(Q) and MR(Q) > MC(Q)',
              'P > ATC(Q) and MR(Q) = MC(Q)',
            ],
            correctAnswer: 1,
            explanation: 'The firm\'s current status is P < ATC(Q) and MR(Q) = MC(Q). Since profits are negative, price must be less than average total cost (P < ATC). Since the firm is maximizing profits (earning the highest possible profits given the price), it must be producing where marginal revenue equals marginal cost (MR = MC). In a competitive market, P = MR, so the firm is producing where P = MC, which is the profit-maximizing condition. Even though profits are negative, the firm is minimizing losses by producing at MR = MC. If it produced less or more, losses would be greater.',
          },
        ],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-6-6',
    title: 'Firm entry, exit, and the shut-down rule',
    duration: '40 min',
    contentItems: [
      {
        id: 'micro-u6-l6-video-1',
        type: 'video',
        title: 'Firm entry, exit, and the shut-down rule',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u6-l6-article',
        type: 'article',
        title: 'Learn: Firm entry, exit, and the shut-down rule',
        content: `# Firm entry, exit, and the shut-down rule

## Shutting down or exiting industry based on price

**Short-run shut-down rule**:
- **Shut down** if P < AVC (can't cover variable costs)
- **Continue producing** if P > AVC (can cover variable costs, minimize loss)

**Why**:
- If P < AVC: Loss = FC + (AVC - P) × Q
- If shut down: Loss = FC
- If P > AVC: Loss = FC - (P - AVC) × Q < FC
- Better to produce and minimize loss

**Long-run exit rule**:
- **Exit** if P < ATC (economic loss)
- **Stay** if P ≥ ATC (economic profit or normal profit)

**Key insight**: Short-run decision depends on AVC; long-run decision depends on ATC.

## Long-run economic profit for perfectly competitive firms

**Perfect competition long run**:
- Economic profit = 0 (normal profit)
- P = ATC (at minimum)
- P = MC
- Firms produce at minimum ATC

**Entry and exit**:
- If economic profit > 0: Firms enter → Supply increases → Price falls → Profit returns to zero
- If economic profit < 0: Firms exit → Supply decreases → Price rises → Profit returns to zero
- Process continues until economic profit = 0

**Key insight**: In long-run competitive equilibrium, economic profit is zero. Entry and exit drive profit to zero.

## Long-run supply when industry costs aren't constant

**Constant costs**:
- Long-run supply is horizontal
- Entry/exit doesn't affect input prices
- Many firms can enter at same cost

**Increasing costs**:
- Long-run supply is upward sloping
- Entry increases input prices (e.g., scarce resources)
- Higher output requires higher price

**Decreasing costs**:
- Long-run supply is downward sloping (rare)
- Entry decreases costs (e.g., infrastructure, knowledge spillovers)
- Lower output requires higher price

**Key insight**: Industry cost structure determines long-run supply curve shape.

## Free response question (FRQ) on perfect competition

**Typical FRQ structure**:

1. **Identify profit-maximizing output**
   - Set MR = MC
   - Find Q and P

2. **Calculate profit or loss**
   - Profit = (P - ATC) × Q
   - Or: TR - TC

3. **Determine short-run decision**
   - Compare P to AVC
   - Shut down if P < AVC

4. **Determine long-run equilibrium**
   - Economic profit = 0
   - P = ATC (minimum)
   - Entry/exit until profit = 0

5. **Analyze effects of changes**
   - Demand shift, cost change, etc.
   - How does equilibrium adjust?

**Key concepts to apply**:
- MR = MC for profit maximization
- Shut-down rule: P vs. AVC
- Long-run: economic profit = 0
- Entry/exit process

**Key insight**: FRQs test understanding of profit maximization, shut-down decisions, and long-run equilibrium.`,
        importantPoints: [
          'Short-run shut-down: P < AVC',
          'Long-run exit: P < ATC',
          'Long-run competitive equilibrium: economic profit = 0',
          'Entry/exit drives profit to zero',
          'Industry cost structure affects long-run supply curve',
        ],
      } as ArticleContent,
    ],
  },
];

const unit7Lessons: Lesson[] = [
  {
    id: 'lesson-7-1',
    title: 'Perfect competition',
    duration: '45 min',
    contentItems: [
      {
        id: 'micro-u7-l1-video-1',
        type: 'video',
        title: 'Perfect competition',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u7-l1-article',
        type: 'article',
        title: 'Learn: Perfect competition',
        content: `# Perfect competition

## Introduction to perfect competition

**Perfect competition** is a market structure with many buyers and sellers of identical products.

**Characteristics**:
1. **Many buyers and sellers**: No single buyer or seller can influence price
2. **Identical products**: Perfect substitutes (homogeneous goods)
3. **Free entry and exit**: No barriers to entry or exit
4. **Perfect information**: All participants have complete information
5. **Price takers**: Firms accept market price (can't set price)

**Key insight**: Perfect competition is a theoretical ideal that helps understand how markets work.

## Perfect competition and why it matters

**Why study perfect competition**:
- **Benchmark**: Provides standard for comparing other market structures
- **Efficiency**: Shows how markets can achieve efficiency
- **Policy**: Helps evaluate market interventions
- **Understanding**: Foundation for understanding imperfect competition

**Real-world examples** (approximate):
- Agricultural markets (wheat, corn)
- Stock markets (for individual stocks)
- Foreign exchange markets

**Key insight**: While rare in practice, perfect competition provides important insights into market behavior and efficiency.

## Economic profit for firms in perfectly competitive markets

**Short run**:
- Firms can earn economic profit, loss, or normal profit
- Depends on price relative to ATC
- If P > ATC: Economic profit
- If P < ATC: Economic loss
- If P = ATC: Normal profit (zero economic profit)

**Long run**:
- Economic profit = 0 (normal profit only)
- Entry/exit drives profit to zero
- P = ATC (at minimum)

**Key insight**: In long-run competitive equilibrium, firms earn zero economic profit (normal profit).

## How perfectly competitive firms make output decisions

**Profit maximization rule**: Produce where MR = MC.

**For perfect competition**:
- MR = P (price is constant)
- So: P = MC
- Firm produces where price equals marginal cost

**Graphical representation**:
- Horizontal demand curve at market price (firm is price taker)
- MC curve determines quantity
- Intersection of P and MC = profit-maximizing output

**Key insight**: Perfectly competitive firms maximize profit by producing where price equals marginal cost.

## Efficiency in perfectly competitive markets

**Allocative efficiency**:
- P = MC
- Price reflects marginal benefit
- Marginal benefit = Marginal cost
- Resources allocated to highest-valued uses

**Productive efficiency**:
- P = Minimum ATC (in long run)
- Producing at lowest cost
- No waste in production

**Key insight**: Perfect competition achieves both allocative and productive efficiency, maximizing total surplus.

## Long-run economic profit for perfectly competitive firms

**Long-run equilibrium**:
- Economic profit = 0
- P = ATC (at minimum)
- P = MC
- Firms produce at minimum ATC

**Entry/exit process**:
- If economic profit > 0: Firms enter → Supply increases → Price falls → Profit = 0
- If economic profit < 0: Firms exit → Supply decreases → Price rises → Profit = 0
- Continues until economic profit = 0

**Key insight**: Entry and exit drive economic profit to zero in long-run competitive equilibrium.

## Long-run supply curve in constant cost perfectly competitive markets

**Constant cost industry**:
- Input prices don't change as industry expands
- Long-run supply is horizontal
- Many firms can enter at same cost
- Price returns to original level after demand change

**Graphical representation**:
- Horizontal long-run supply curve
- At minimum ATC
- Entry/exit doesn't affect costs

**Key insight**: Constant costs lead to horizontal long-run supply curve.

## Long-run supply when industry costs aren't constant

**Increasing cost industry**:
- Input prices increase as industry expands
- Long-run supply is upward sloping
- Higher output requires higher price
- Example: Scarce resources

**Decreasing cost industry** (rare):
- Costs decrease as industry expands
- Long-run supply is downward sloping
- Example: Infrastructure, knowledge spillovers

**Key insight**: Industry cost structure determines long-run supply curve shape.

## Free response question (FRQ) on perfect competition

**Typical FRQ structure**:

1. **Identify profit-maximizing output**
   - Set P = MC (or MR = MC)
   - Find Q

2. **Calculate profit or loss**
   - Profit = (P - ATC) × Q
   - Or: TR - TC

3. **Determine short-run decision**
   - Compare P to AVC
   - Shut down if P < AVC

4. **Determine long-run equilibrium**
   - Economic profit = 0
   - P = ATC (minimum)
   - Entry/exit until profit = 0

5. **Analyze effects of changes**
   - Demand shift, cost change
   - How does equilibrium adjust?

**Key concepts**: P = MC, shut-down rule, long-run equilibrium, efficiency.`,
        importantPoints: [
          'Perfect competition: many buyers/sellers, identical products, free entry/exit',
          'Firms are price takers: P = MR = MC',
          'Long-run equilibrium: economic profit = 0, P = ATC (minimum)',
          'Perfect competition achieves allocative and productive efficiency',
          'Long-run supply depends on industry cost structure',
        ],
      } as ArticleContent,
      {
        id: 'micro-u7-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Perfect competition',
        questions: [
          {
            id: 'quiz-7-1-1',
            question: 'All of the following are characteristics of perfectly competitive markets EXCEPT',
            options: [
              'many sellers',
              'many buyers',
              'perfect information',
              'identical goods',
              'barriers to entry',
            ],
            correctAnswer: 4,
            explanation: 'Barriers to entry are NOT a characteristic of perfectly competitive markets. Perfectly competitive markets are characterized by free entry and exit - there are no barriers preventing new firms from entering or existing firms from leaving the market. The other options are all characteristics of perfect competition: many sellers (no single firm can influence price), many buyers, perfect information (all participants have complete information about prices and products), and identical goods (homogeneous products, so consumers are indifferent between sellers).',
          },
          {
            id: 'quiz-7-1-2',
            question: 'Which of the following MUST be true for a firm in a perfectly competitive market in the short run and in the long run?',
            options: [
              'Firms earn positive economic profit.',
              'Firms charge prices higher than the average total cost.',
              'Firms produce the cost-efficient quantity.',
              'Firms make losses.',
              'Price equals marginal cost.',
            ],
            correctAnswer: 4,
            explanation: 'Price equals marginal cost (P = MC) MUST be true for a firm in a perfectly competitive market in both the short run and the long run. This is the profit-maximization condition. In perfect competition, firms are price takers, so P = MR. Profit maximization requires MR = MC, therefore P = MC. This condition holds in both short run and long run. The other options are not necessarily true: firms may earn zero economic profit in long-run equilibrium, prices may equal ATC in long run, firms may not be at minimum ATC in short run, and firms may make losses in short run but not in long-run equilibrium.',
          },
          {
            id: 'quiz-7-1-3',
            question: 'Which of the following describes the conditions that exist in a perfectly competitive market in the short run, and which are associated with firms leaving the market in the long run?',
            options: [
              'P > ATC, P = MC, productive efficiency',
              'P < ATC, P > MC, allocative efficiency',
              'P < ATC, P = MC, allocative efficiency',
              'P = ATC, P > MC, productive efficiency',
              'P = ATC, P = MC, productive efficiency and allocative efficiency',
            ],
            correctAnswer: 2,
            explanation: 'The conditions P < ATC, P = MC, allocative efficiency describe a perfectly competitive market in the short run where firms are experiencing losses (P < ATC), which will lead to firms exiting the market in the long run. In perfect competition, firms are price takers and maximize profit by setting P = MC, which achieves allocative efficiency (resources are allocated to their most valued uses). However, when P < ATC, firms are making economic losses. In the long run, these losses cause firms to exit the market, reducing supply and raising price until P = ATC (zero economic profit).',
          },
          {
            id: 'quiz-7-1-4',
            question: 'Occam\'s Razors is a typical firm in a perfectly competitive market. Its total revenue from selling 1000 razors is $2500 and its variable costs are $2000. If the market for razors is in long-run equilibrium, which of the following can be inferred based on the above information?',
            options: [
              'The marginal cost of a razor is $2.50 and the average fixed cost is $0.50',
              'Average total cost will decrease if the firm increases output',
              'The price of a razor is $3 and the marginal cost of a razor is $3.',
              'Average total cost will decrease if the firm decreases output',
              'The fixed costs of production are $500 and marginal revenue is $2',
            ],
            correctAnswer: 0,
            explanation: 'In long-run equilibrium, we can infer that the marginal cost of a razor is $2.50 and the average fixed cost is $0.50. Price = TR/Q = $2500/1000 = $2.50. In long-run equilibrium, P = MC = ATC (at minimum), so MC = $2.50. Total cost = Total revenue (zero economic profit) = $2500. Fixed costs = TC - VC = $2500 - $2000 = $500. Average fixed cost = FC/Q = $500/1000 = $0.50. The firm is at minimum ATC, so changing output would increase ATC, not decrease it. Marginal revenue = P = $2.50, not $2.',
          },
        ],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-7-2',
    title: 'Monopoly',
    duration: '50 min',
    contentItems: [
      {
        id: 'micro-u7-l2-video-1',
        type: 'video',
        title: 'Monopoly',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u7-l2-article',
        type: 'article',
        title: 'Learn: Monopoly',
        content: `# Monopoly

## Perfect and imperfect competition

**Perfect competition**: Many firms, identical products, price takers.

**Imperfect competition**: Market structures where firms have some control over price.

**Types of imperfect competition**:
- **Monopoly**: One seller
- **Oligopoly**: Few sellers
- **Monopolistic competition**: Many sellers, differentiated products

**Key difference**: In imperfect competition, firms face downward-sloping demand curves (can influence price).

## Types of competition and marginal revenue

**Perfect competition**:
- MR = P (constant)
- Horizontal demand curve
- Price taker

**Imperfect competition** (monopoly, oligopoly, monopolistic competition):
- MR < P (decreasing)
- Downward-sloping demand curve
- Price maker

**Why MR < P in imperfect competition**:
- To sell more, must lower price
- Lower price applies to all units (not just marginal unit)
- MR = P - (loss on previous units)

**Key insight**: In imperfect competition, marginal revenue is less than price because firms must lower price to sell more.

## Marginal revenue and marginal cost in imperfect competition

**Profit maximization**: Still MR = MC.

**But**:
- MR < P (in imperfect competition)
- So: P > MC at profit-maximizing output
- Price exceeds marginal cost

**Graphical representation**:
- Downward-sloping demand curve
- MR curve below demand curve
- MC curve
- MR = MC determines output
- Price from demand curve at that output

**Key insight**: Imperfectly competitive firms produce where MR = MC, but P > MC.

## Monopolies vs. perfect competition

**Perfect competition**:
- Many firms
- P = MC
- Efficient (allocative and productive)
- Zero economic profit (long run)

**Monopoly**:
- One firm
- P > MC
- Inefficient (deadweight loss)
- Can earn economic profit (long run)

**Comparison**:
- Monopoly: Higher price, lower quantity
- Monopoly: Deadweight loss
- Monopoly: Transfer of surplus from consumers to producer

**Key insight**: Monopoly leads to higher prices, lower output, and inefficiency compared to perfect competition.

## Economic profit for a monopoly

**Monopoly can earn economic profit**:
- Barriers to entry prevent competition
- No entry → No price competition
- Can maintain P > ATC
- Economic profit persists in long run

**Graphical representation**:
- Profit = (P - ATC) × Q
- Rectangle above ATC, below price
- Can be positive, zero, or negative (short run)

**Key insight**: Unlike perfect competition, monopolies can earn economic profit in long run due to barriers to entry.

## Monopolist optimizing price: Total revenue

**Total revenue (TR) = P × Q**

**For monopolist**:
- Must choose price (or quantity)
- Lower price → Higher quantity (but lower price on all units)
- TR may increase or decrease with price change

**Elasticity matters**:
- If demand is elastic: Lower price increases TR
- If demand is inelastic: Lower price decreases TR
- If demand is unit elastic: TR is maximized

**Key insight**: Monopolist's revenue depends on price elasticity of demand.

## Monopolist optimizing price: Marginal revenue

**Marginal revenue (MR)**:
- Additional revenue from selling one more unit
- MR = ΔTR / ΔQ
- For linear demand: MR has twice the slope of demand

**Relationship to demand**:
- MR curve is below demand curve
- MR = P when Q = 0
- MR < P for Q > 0
- MR can be negative (if demand is inelastic)

**Key insight**: MR is less than price because monopolist must lower price on all units to sell more.

## Monopolist optimizing price: Deadweight loss

**Deadweight loss from monopoly**:
- Monopoly produces less than competitive output
- P > MC (not allocatively efficient)
- Some mutually beneficial trades don't occur
- Triangle of lost surplus

**Graphical representation**:
- Competitive: P = MC, Q = Qc
- Monopoly: P > MC, Q = Qm < Qc
- Deadweight loss = triangle between demand, MC, and quantities

**Key insight**: Monopoly creates deadweight loss by restricting output and raising price above marginal cost.

## Review of revenue and cost graphs for a monopoly

**Key curves**:
- **Demand (D)**: Downward sloping, shows price at each quantity
- **Marginal revenue (MR)**: Below demand, twice the slope
- **Marginal cost (MC)**: Usually upward sloping
- **Average total cost (ATC)**: U-shaped

**Profit maximization**:
- MR = MC determines output (Qm)
- Price from demand curve at Qm (Pm)
- Profit = (Pm - ATC) × Qm

**Key insight**: Understanding these curves is essential for analyzing monopoly behavior.

## (Optional) Calculus proof to show that MR has twice the slope of demand

**For linear demand**: P = a - bQ

**Total revenue**: TR = P × Q = (a - bQ) × Q = aQ - bQ²

**Marginal revenue**: MR = dTR/dQ = a - 2bQ

**Comparison**:
- Demand: P = a - bQ (slope = -b)
- MR: MR = a - 2bQ (slope = -2b)

**Key insight**: MR has twice the slope of demand for linear demand curves.`,
        importantPoints: [
          'Monopoly: one seller, barriers to entry',
          'MR < P in monopoly (unlike perfect competition)',
          'Profit maximization: MR = MC, but P > MC',
          'Monopoly creates deadweight loss',
          'Monopoly can earn economic profit in long run',
        ],
      } as ArticleContent,
      {
        id: 'micro-u7-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Monopoly',
        questions: [
          {
            id: 'quiz-7-2-1',
            question: 'The market for walrus hats has one seller and many buyers. Assume all walrus hats sold are identical. What kind of industry is the market for walrus hats?',
            options: [
              'monopolistic competition',
              'monopsony',
              'perfectly competitive',
              'monopoly',
              'oligopoly',
            ],
            correctAnswer: 3,
            explanation: 'The market for walrus hats is a monopoly. A monopoly is a market structure with a single seller and many buyers. Since there is only one seller of walrus hats, this is a monopoly. Monopolistic competition has many sellers with differentiated products. Perfect competition has many sellers with identical products. An oligopoly has a few sellers. A monopsony is a market with a single buyer, not a single seller.',
          },
          {
            id: 'quiz-7-2-2',
            question: 'If a firm must lower its price to sell more of a good, which of the following must also be true?',
            options: [
              'Its marginal revenue curve is upward-sloping.',
              'Its marginal revenue curve is equal to its demand curve.',
              'Its marginal revenue curve is the same as its marginal cost curve.',
              'Its marginal revenue curve is lower than its demand curve.',
              'Its marginal revenue curve is higher than its average total cost curve.',
            ],
            correctAnswer: 3,
            explanation: 'If a firm must lower its price to sell more of a good, its marginal revenue curve must be lower than its demand curve. When a firm faces a downward-sloping demand curve (must lower price to sell more), marginal revenue is less than price. This is because to sell an additional unit, the firm must lower the price not just on that unit, but on all units it could have sold at the higher price. Therefore, MR < P, meaning the MR curve lies below the demand curve. In perfect competition, where firms are price takers, MR = P = demand curve, but that\'s not the case here since the firm must lower price to sell more.',
          },
          {
            id: 'quiz-7-2-3',
            question: 'The market for space travel has the possibility to be very profitable, but it is also likely to be imperfectly competitive. Which of the following is the most likely reason that the space travel industry is imperfectly competitive?',
            options: [
              'high profits',
              'low barriers to entry',
              'having no control over price',
              'high start-up costs',
              'low minimum efficient scale relative to the size of the market',
            ],
            correctAnswer: 3,
            explanation: 'High start-up costs are the most likely reason that the space travel industry is imperfectly competitive. High start-up costs act as a significant barrier to entry, preventing many firms from entering the market. This creates imperfect competition (monopoly, oligopoly, or monopolistic competition) rather than perfect competition. High profits (A) are a result of imperfect competition, not a cause. Low barriers to entry (B) would lead to perfect competition. Having no control over price (C) describes perfect competition. Low minimum efficient scale (E) would allow many small firms to enter, leading to more competitive markets.',
          },
        ],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-7-3',
    title: 'Price discrimination',
    duration: '30 min',
    contentItems: [
      {
        id: 'micro-u7-l3-video-1',
        type: 'video',
        title: 'Price discrimination',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u7-l3-article',
        type: 'article',
        title: 'Learn: Price discrimination',
        content: `# Price discrimination

## Price discrimination

**Price discrimination**: Charging different prices to different customers for the same product.

**Conditions for price discrimination**:
1. **Market power**: Firm must have some control over price
2. **Different elasticities**: Different customer groups have different price sensitivities
3. **No arbitrage**: Customers can't resell the product

**Types**:
- **First-degree (perfect)**: Charge each customer their maximum willingness to pay
- **Second-degree**: Different prices for different quantities (volume discounts)
- **Third-degree**: Different prices for different customer groups (student discounts, senior discounts)

## Monopoly price discrimination

**Effects of price discrimination**:
- **Increases profit**: Captures more consumer surplus
- **May increase output**: Can sell to more customers
- **May reduce deadweight loss**: If output increases
- **Redistributes surplus**: From consumers to producer

**Perfect price discrimination (first-degree)**:
- Charges each customer maximum willingness to pay
- Captures all consumer surplus
- No deadweight loss (produces where P = MC)
- Maximum profit

**Third-degree price discrimination**:
- Different prices for different groups
- Higher price for inelastic group
- Lower price for elastic group
- MR equal across groups

**Key insight**: Price discrimination allows monopolists to increase profit and may increase efficiency.`,
        importantPoints: [
          'Price discrimination: different prices for same product',
          'Requires: market power, different elasticities, no arbitrage',
          'Increases profit by capturing consumer surplus',
          'May increase output and reduce deadweight loss',
          'Perfect discrimination: no deadweight loss, all surplus to producer',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-7-4',
    title: 'Monopolistic competition',
    duration: '35 min',
    contentItems: [
      {
        id: 'micro-u7-l4-video-1',
        type: 'video',
        title: 'Monopolistic competition',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u7-l4-article',
        type: 'article',
        title: 'Learn: Monopolistic competition',
        content: `# Monopolistic competition

## Oligopolies and monopolistic competition

**Monopolistic competition**: Many firms selling differentiated products.

**Characteristics**:
- **Many firms**: Like perfect competition
- **Differentiated products**: Like monopoly (some market power)
- **Free entry and exit**: Like perfect competition
- **Downward-sloping demand**: Like monopoly

**Examples**: Restaurants, clothing stores, coffee shops, hair salons

**Oligopoly**: Few firms, may have differentiated or identical products.

**Key insight**: Monopolistic competition combines features of perfect competition and monopoly.

## Monopolistic competition and economic profit

**Short run**:
- Can earn economic profit, loss, or normal profit
- Downward-sloping demand curve
- MR = MC determines output
- P > MC (like monopoly)

**Profit maximization**:
- Same as monopoly: MR = MC
- But demand is more elastic (many substitutes)
- Less market power than monopoly

**Key insight**: Monopolistic competitors have some market power but face competition from similar products.

## Long-run economic profit for monopolistic competition

**Long-run equilibrium**:
- Economic profit = 0 (normal profit)
- P = ATC (but not at minimum)
- P > MC (not allocatively efficient)
- Excess capacity (not productively efficient)

**Entry/exit process**:
- If economic profit > 0: Firms enter → Demand shifts left → Profit = 0
- If economic profit < 0: Firms exit → Demand shifts right → Profit = 0
- Continues until economic profit = 0

**Inefficiency**:
- P > MC: Allocative inefficiency
- Not at minimum ATC: Productive inefficiency
- But: Product variety benefits consumers

**Key insight**: Long-run equilibrium has zero economic profit but is inefficient. Product differentiation provides benefits.`,
        importantPoints: [
          'Monopolistic competition: many firms, differentiated products',
          'Short run: can earn economic profit',
          'Long run: economic profit = 0, but P > MC',
          'Inefficient but provides product variety',
          'Entry/exit drives profit to zero',
        ],
      } as ArticleContent,
      {
        id: 'micro-u7-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Monopolistic competition',
        questions: [
          {
            id: 'quiz-7-4-1',
            question: 'Which of the following statements correctly identifies a difference between monopoly and monopolistic competition?',
            options: [
              'There is only one firm in monopoly, but there are a few firms in monopolistic competition.',
              'There are barriers to entry in monopoly, but not in monopolistic competition.',
              'The monopoly firm charges a markup, but a monopolistically competitive firm does not.',
              'There are many buyers in monopoly, but there are only a few buyers in monopolistic competition.',
              'The demand curve is downward sloping in monopoly, but not in monopolistic competition.',
            ],
            correctAnswer: 1,
            explanation: 'The correct difference is that there are barriers to entry in monopoly, but not in monopolistic competition. Barriers to entry are a defining characteristic of monopoly - they prevent other firms from entering the market, allowing the monopolist to maintain its market power. In contrast, monopolistic competition is characterized by free entry and exit - there are no significant barriers, so new firms can enter if there are economic profits. Both market structures have many buyers, both face downward-sloping demand curves, and both charge markups (P > MC). Monopolistic competition has many firms, not just a few.',
          },
          {
            id: 'quiz-7-4-2',
            question: 'Dinosaur Inn is a hotel that differentiates itself from other hotels in a market with many buyers by offering rooms with different dinosaur themes, such as the T-Rex Relax room and the Bambiraptor Suite. Which of the following will be true for the Dinosaur Inn when this industry is in long-run equilibrium?',
            options: [
              'Price exceeds marginal revenue, there are positive economic profits, and it has excess capacity.',
              'Price is less than marginal revenue, there are negative economic profits, and there is no excess capacity.',
              'Price is less than marginal revenue, there are positive economic profits, and there is no excess capacity.',
              'Price exceeds marginal cost, there are no economic profits, and it has excess capacity.',
              'Price equals marginal cost, there are negative economic profits, and it has excess capacity.',
            ],
            correctAnswer: 3,
            explanation: 'In long-run equilibrium for monopolistic competition, price exceeds marginal cost (P > MC), there are no economic profits (zero economic profit due to free entry/exit), and the firm has excess capacity. Dinosaur Inn operates in monopolistic competition (differentiated products, many buyers). In long-run equilibrium: P > MR = MC (profit maximization), economic profit = 0 (entry drives profit to zero), and the firm produces at a quantity less than the minimum of ATC, creating excess capacity. Price cannot be less than marginal revenue for a firm with market power, and economic profits must be zero in long-run equilibrium.',
          },
          {
            id: 'quiz-7-4-3',
            question: 'Which of the following correctly describes economic profits and allocative efficiency for a firm in monopolistic competition in long-run equilibrium?',
            options: [
              'It earns zero economic profits and is allocatively inefficient.',
              'It earns positive economic profits and is allocatively inefficient.',
              'It earns negative economic profits and is allocatively efficient.',
              'It earns zero economic profits and is allocatively efficient.',
              'It earns zero economic profits and is allocatively neutral.',
            ],
            correctAnswer: 0,
            explanation: 'A firm in monopolistic competition in long-run equilibrium earns zero economic profits and is allocatively inefficient. Economic profits are zero because free entry and exit drive profits to zero in the long run. However, the firm is allocatively inefficient because it produces where P > MC (price exceeds marginal cost). Allocative efficiency requires P = MC, which occurs only in perfect competition. In monopolistic competition, the firm has market power due to product differentiation, so it charges a price above marginal cost, creating a deadweight loss and allocative inefficiency.',
          },
          {
            id: 'quiz-7-4-4',
            question: 'Which is true of a firm in monopolistic competition in the long run, but not true of perfect competition in the long run?',
            options: [
              'There are identical products.',
              'There is excess capacity.',
              'There are no barriers to entry.',
              'There is only one buyer.',
              'There is no economic profit.',
            ],
            correctAnswer: 1,
            explanation: 'Excess capacity is true of a firm in monopolistic competition in the long run, but not true of perfect competition in the long run. In monopolistic competition, firms produce at a quantity less than the minimum of their ATC curve (where ATC is minimized), creating excess capacity. In perfect competition, firms produce at the minimum of ATC, operating at efficient scale with no excess capacity. Both market structures have no barriers to entry and zero economic profit in long-run equilibrium. Identical products characterize perfect competition, not monopolistic competition. One buyer describes a monopsony, not relevant here.',
          },
        ],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-7-5',
    title: 'Oligopoly and game theory',
    duration: '45 min',
    contentItems: [
      {
        id: 'micro-u7-l5-video-1',
        type: 'video',
        title: 'Oligopoly and game theory',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u7-l5-article',
        type: 'article',
        title: 'Learn: Oligopoly and game theory',
        content: `# Oligopoly and game theory

## Oligopolies, duopolies, collusion, and cartels

**Oligopoly**: Market with few firms (2-10 typically).

**Duopoly**: Special case with 2 firms.

**Characteristics**:
- **Interdependence**: Each firm's actions affect others
- **Strategic behavior**: Must consider competitors' responses
- **Barriers to entry**: Often present
- **Product differentiation**: May or may not exist

**Collusion**: Firms coordinate to act like a monopoly.

**Cartel**: Formal agreement to collude (e.g., OPEC).

**Problems with collusion**:
- Illegal in many countries
- Incentive to cheat
- Difficult to maintain

**Key insight**: Oligopolies involve strategic interaction between firms.

## Prisoners' dilemma and Nash equilibrium

**Prisoners' dilemma**: Game where both players have incentive to defect (cheat) even though cooperation is better.

**Example** (price competition):
- Both firms high price: Both profit = 10
- One high, one low: High = 5, Low = 15
- Both low: Both profit = 8
- Dominant strategy: Both choose low (even though both high is better)

**Nash equilibrium**: Outcome where no player can improve by changing strategy (given others' strategies).

**In prisoners' dilemma**:
- Nash equilibrium: Both defect (low price)
- But: Both would be better off cooperating (high price)
- Problem: Incentive to cheat

**Key insight**: Prisoners' dilemma explains why collusion is difficult to maintain.

## More on Nash equilibrium

**Definition**: Set of strategies where each player's strategy is best response to others' strategies.

**Key properties**:
- No player wants to deviate (given others' strategies)
- May not be optimal for group
- May not be unique

**Finding Nash equilibrium**:
- For each player, find best response to each possible strategy of others
- Nash equilibrium: Where all players play best responses

**Key insight**: Nash equilibrium is a key concept in game theory for analyzing strategic interactions.

## Why parties in cartels cheat

**Incentive to cheat**:
- If others cooperate (high price), you can profit by cheating (low price)
- Gain market share and profit
- Others lose
- But if all cheat, all lose

**Example** (OPEC):
- If all limit production: High price, all profit
- If one cheats: That country gains, others lose
- If all cheat: Low price, all lose

**Why cartels fail**:
- Strong incentive to cheat
- Difficult to detect and punish
- Members have different interests

**Key insight**: Cartels are unstable because members have incentive to cheat.

## Game theory of cheating firms

**Game theory**: Study of strategic decision-making.

**Key concepts**:
- **Players**: Firms in oligopoly
- **Strategies**: Actions (e.g., high price, low price)
- **Payoffs**: Profits from each outcome
- **Nash equilibrium**: Outcome where no one wants to deviate

**Applications**:
- Price competition
- Advertising
- Product development
- Entry decisions

**Key insight**: Game theory helps analyze oligopoly behavior and predict outcomes.`,
        importantPoints: [
          'Oligopoly: few firms, strategic interdependence',
          'Prisoners\' dilemma: incentive to cheat even when cooperation is better',
          'Nash equilibrium: no player wants to deviate',
          'Cartels are unstable due to incentive to cheat',
          'Game theory analyzes strategic interactions',
        ],
      } as ArticleContent,
    ],
  },
];

const unit8Lessons: Lesson[] = [
  {
    id: 'lesson-8-1',
    title: 'Introduction to factor markets',
    duration: '35 min',
    contentItems: [
      {
        id: 'micro-u8-l1-video-1',
        type: 'video',
        title: 'Introduction to factor markets',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u8-l1-article',
        type: 'article',
        title: 'Learn: Introduction to factor markets',
        content: `# Introduction to factor markets

## A firm's marginal product revenue curve

**Marginal product revenue (MPR)** or **Marginal revenue product (MRP)**: Additional revenue from hiring one more unit of input.

**Formula**: MRP = MR × MP

Where:
- MR = Marginal revenue (from output market)
- MP = Marginal product (of input)

**For perfect competition in output market**:
- MR = P (price)
- So: MRP = P × MP

**Key insight**: MRP shows how much additional revenue a firm gets from hiring one more unit of input.

## How many people to hire given the MPR curve

**Profit-maximizing rule**: Hire until MRP = Wage (price of input).

**Why**:
- If MRP > Wage: Hiring more increases profit
- If MRP < Wage: Hiring less increases profit
- If MRP = Wage: Profit maximized

**Graphical representation**:
- MRP curve (downward sloping, due to diminishing MP)
- Wage line (horizontal, if competitive factor market)
- Intersection determines optimal employment

**Key insight**: Firms hire inputs until marginal revenue product equals the input price.

## Introduction to labor markets

**Labor market**: Market where workers sell labor and firms buy labor.

**Demand for labor**:
- Derived from demand for output
- MRP curve is demand curve
- Downward sloping (diminishing marginal product)

**Supply of labor**:
- Workers supply labor
- Upward sloping (higher wage → more labor supplied)
- Depends on labor-leisure tradeoff

**Equilibrium**:
- Where labor demand = labor supply
- Determines wage and employment

**Key insight**: Labor markets determine wages and employment through supply and demand.

## Labor-leisure tradeoff and the labor supply curve

**Labor-leisure tradeoff**: Workers choose between work (income) and leisure (time).

**Tradeoff**:
- More work → More income but less leisure
- More leisure → Less income but more time

**Income effect**:
- Higher wage → Higher income → May work less (leisure is normal good)

**Substitution effect**:
- Higher wage → Higher opportunity cost of leisure → Work more

**Net effect**:
- Usually: Substitution effect dominates → Labor supply upward sloping
- But: At very high wages, income effect may dominate → Backward-bending supply

**Labor supply curve**:
- Usually upward sloping
- Shows quantity of labor supplied at each wage
- Can bend backward at high wages

**Key insight**: Labor supply depends on the tradeoff between income and leisure, with income and substitution effects.`,
        importantPoints: [
          'Marginal revenue product (MRP) = MR × MP',
          'Profit maximization: hire until MRP = wage',
          'Labor demand is derived from output demand',
          'Labor supply depends on labor-leisure tradeoff',
          'Income and substitution effects determine labor supply shape',
        ],
      } as ArticleContent,
      {
        id: 'micro-u8-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Introduction to factor markets',
        questions: [
          {
            id: 'quiz-8-1-1',
            question: 'Which of the following best describes a firm\'s marginal revenue product of labor (MRPL)?',
            options: [
              'the additional revenue gained from the sale of one more unit',
              'the additional output gained from using one more unit of input',
              'the marginal product labor multiplied by the marginal revenue gained',
              'the additional cost associated with using an additional unit of labor',
              'the horizontal sum of every firm\'s demand for labor',
            ],
            correctAnswer: 2,
            explanation: 'A firm\'s marginal revenue product of labor (MRPL) is the marginal product of labor multiplied by the marginal revenue gained. MRPL = MPL × MR. This measures the additional revenue a firm earns from hiring one more unit of labor. The marginal product of labor (MPL) is the additional output from one more worker, and marginal revenue (MR) is the additional revenue from selling one more unit of output. Multiplying them gives the value of the additional output produced by the extra worker. In perfect competition, MR = P, so MRPL = MPL × P.',
          },
          {
            id: 'quiz-8-1-2',
            question: 'Which of the following best describes the behavior that creates a labor supply curve?',
            options: [
              'a firm choosing its output to maximize profit',
              'an individual maximizing utility in choosing between labor and leisure',
              'a country choosing a point on its production possibilities curve',
              'an individual maximizing utility by choosing what goods to consume',
              'a firm comparing the marginal revenue product of labor to the price of labor',
            ],
            correctAnswer: 1,
            explanation: 'The labor supply curve is created by an individual maximizing utility in choosing between labor and leisure. Individuals face a tradeoff between working (earning income) and leisure (enjoying free time). As the wage rate increases, individuals must decide whether to work more (substitution effect) or work less and enjoy more leisure (income effect). The labor supply curve shows how much labor individuals are willing to supply at different wage rates, based on their utility maximization between labor and leisure. Firms create labor demand, not supply. Consumption choices create demand curves for goods, not labor supply.',
          },
          {
            id: 'quiz-8-1-3',
            question: 'The table below gives output, marginal product, and average product of a firm producing novelty T-shirts using different numbers of workers. The firm produces t-shirts in a perfectly competitive market where the price of a t-shirt is $10. What is the marginal revenue product of labor (MRPL) of the fourth worker?',
            options: [
              '$100',
              '$400',
              '$500',
              '$1300',
              '$700',
            ],
            correctAnswer: 4,
            explanation: 'The marginal revenue product of labor (MRPL) of the fourth worker is $700. MRPL = MPL × P. From the table, when going from 3 to 4 workers, output increases from 330 to 400, so the marginal product of the fourth worker is 400 - 330 = 70. In a perfectly competitive market, MR = P = $10. Therefore, MRPL = 70 × $10 = $700. This represents the additional revenue the firm earns from hiring the fourth worker.',
          },
        ],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-8-2',
    title: 'Changes in factor demand and supply',
    duration: '30 min',
    contentItems: [
      {
        id: 'micro-u8-l2-video-1',
        type: 'video',
        title: 'Changes in factor demand and supply',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u8-l2-article',
        type: 'article',
        title: 'Learn: Changes in factor demand and supply',
        content: `# Changes in factor demand and supply

## Adding demand curves

**Market demand for labor**: Sum of all individual firms' demand curves.

**How to find**:
- At each wage, add up quantity of labor demanded by all firms
- Market demand = Σ Individual firm demands

**Key insight**: Market demand for a factor is the horizontal sum of individual firm demands.

## Changes in labor supply

**Factors that shift labor supply**:

1. **Population changes**:
   - More people → More labor supply (shift right)
   - Fewer people → Less labor supply (shift left)

2. **Preferences**:
   - Preference for work → More supply (shift right)
   - Preference for leisure → Less supply (shift left)

3. **Non-wage income**:
   - Higher non-wage income → Less labor supply (shift left)
   - Lower non-wage income → More labor supply (shift right)

4. **Opportunities in other markets**:
   - Better opportunities elsewhere → Less supply (shift left)
   - Worse opportunities elsewhere → More supply (shift right)

5. **Immigration**:
   - More immigration → More supply (shift right)
   - Less immigration → Less supply (shift left)

**Key insight**: Many factors can shift labor supply, affecting wages and employment.

## Shifts in the demand for labor

**Factors that shift labor demand** (shift MRP curve):

1. **Output price**:
   - Higher output price → Higher MRP → More demand (shift right)
   - Lower output price → Lower MRP → Less demand (shift left)

2. **Technology**:
   - Better technology → Higher MP → Higher MRP → More demand (shift right)
   - Or: Technology may substitute for labor → Less demand (shift left)

3. **Price of other inputs**:
   - Higher price of substitute input → More demand for labor (shift right)
   - Higher price of complement input → Less demand for labor (shift left)

4. **Number of firms**:
   - More firms → More demand (shift right)
   - Fewer firms → Less demand (shift left)

**Key insight**: Labor demand shifts when factors affecting MRP change.`,
        importantPoints: [
          'Market demand is sum of individual firm demands',
          'Labor supply shifts: population, preferences, non-wage income, opportunities',
          'Labor demand shifts: output price, technology, other input prices, number of firms',
          'Changes in supply and demand affect wages and employment',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-8-3',
    title: 'Optimal choice of factors in perfectly competitive factor markets',
    duration: '35 min',
    contentItems: [
      {
        id: 'micro-u8-l3-video-1',
        type: 'video',
        title: 'Optimal choice of factors in perfectly competitive factor markets',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u8-l3-article',
        type: 'article',
        title: 'Learn: Optimal choice of factors in perfectly competitive factor markets',
        content: `# Optimal choice of factors in perfectly competitive factor markets

## Cost minimizing choice of inputs

**Cost minimization**: Produce given output at lowest cost.

**Rule**: MPₗ / W = MPₖ / R

Where:
- MPₗ = Marginal product of labor
- W = Wage (price of labor)
- MPₖ = Marginal product of capital
- R = Rental rate (price of capital)

**Interpretation**: Marginal product per dollar should be equal for all inputs.

**Why**:
- If MPₗ/W > MPₖ/R: Get more output per dollar from labor
- Should use more labor, less capital
- Continue until equal

**Key insight**: Cost minimization requires equalizing marginal product per dollar across all inputs.

## Factor markets worked example

**Example**:

Given:
- Output: Q = 100 units
- Labor: MPₗ = 10, W = $20
- Capital: MPₖ = 15, R = $30

**Check if cost-minimizing**:
- MPₗ/W = 10/20 = 0.5
- MPₖ/R = 15/30 = 0.5
- Equal → Cost-minimizing ✓

**If not equal**:
- If MPₗ/W > MPₖ/R: Use more labor, less capital
- Adjust until equal

**Profit maximization**:
- Also requires: MRP = Input price
- For labor: MRPₗ = W
- For capital: MRPₖ = R

**Key insight**: Firms minimize cost and maximize profit by equalizing marginal product per dollar and setting MRP equal to input prices.`,
        importantPoints: [
          'Cost minimization: MP/W equal for all inputs',
          'Profit maximization: MRP = input price',
          'Firms choose input combination to minimize cost and maximize profit',
          'Equalizing MP per dollar ensures efficient input use',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-8-4',
    title: 'Choosing inputs when factor markets are monopsonistically competitive',
    duration: '35 min',
    contentItems: [
      {
        id: 'micro-u8-l4-video-1',
        type: 'video',
        title: 'Choosing inputs when factor markets are monopsonistically competitive',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u8-l4-article',
        type: 'article',
        title: 'Learn: Choosing inputs when factor markets are monopsonistically competitive',
        content: `# Choosing inputs when factor markets are monopsonistically competitive

## A monopsonistic market for labor

**Monopsony**: Market with one buyer (employer).

**Characteristics**:
- Single employer (or few employers)
- Must pay higher wage to attract more workers
- Faces upward-sloping supply curve
- Has market power in factor market

**Marginal factor cost (MFC)**:
- Additional cost of hiring one more worker
- MFC > Wage (because must raise wage for all workers)
- MFC curve is above supply curve

**Profit maximization**:
- Hire until MRP = MFC
- But: MFC > Wage
- So: MRP > Wage (unlike perfect competition)

**Key insight**: Monopsony pays workers less and hires fewer workers than competitive market.

## Monopsony employers and minimum wages

**Effects of minimum wage in competitive market**:
- Creates surplus (unemployment)
- Reduces employment
- Deadweight loss

**Effects of minimum wage in monopsony**:
- Can increase employment (if minimum wage < competitive wage)
- Can increase wages
- May reduce deadweight loss
- Can improve efficiency

**Why**:
- Monopsony underemploys (MRP > Wage)
- Minimum wage can force monopsony to hire more
- If minimum wage is set correctly, can increase both wages and employment

**Key insight**: Minimum wage can have different effects in monopsony versus competitive markets. In monopsony, it may increase employment.`,
        importantPoints: [
          'Monopsony: one buyer in factor market',
          'MFC > Wage (must raise wage for all workers)',
          'Profit maximization: MRP = MFC',
          'Monopsony pays less and hires less than competitive market',
          'Minimum wage may increase employment in monopsony',
        ],
      } as ArticleContent,
    ],
  },
];

const unit9Lessons: Lesson[] = [
  {
    id: 'lesson-9-1',
    title: 'Externalities',
    duration: '50 min',
    contentItems: [
      {
        id: 'micro-u9-l1-video-1',
        type: 'video',
        title: 'Externalities',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u9-l1-article',
        type: 'article',
        title: 'Learn: Externalities',
        content: `# Externalities

## Allocative efficiency and marginal benefit

**Allocative efficiency**: Resources allocated to highest-valued uses.

**Requires**: Marginal social benefit (MSB) = Marginal social cost (MSC)

**Marginal social benefit (MSB)**:
- Benefit to society from one more unit
- Includes private benefit and external benefit

**Marginal social cost (MSC)**:
- Cost to society from one more unit
- Includes private cost and external cost

**Key insight**: Allocative efficiency requires considering all benefits and costs, not just private ones.

## Negative externalities

**Negative externality**: Cost imposed on third parties (not involved in transaction).

**Examples**: Pollution, noise, traffic congestion, secondhand smoke

**Problem**:
- Private cost < Social cost
- Market produces too much (overproduction)
- Price too low, quantity too high
- Deadweight loss

**Graphical representation**:
- Supply curve = Marginal private cost (MPC)
- Social cost curve = Marginal social cost (MSC) above supply
- Market equilibrium: MPC = Demand
- Efficient equilibrium: MSC = Demand
- Deadweight loss triangle

**Key insight**: Negative externalities cause overproduction and inefficiency.

## Positive externalities

**Positive externality**: Benefit received by third parties (not involved in transaction).

**Examples**: Education, vaccination, research, beekeeping (pollination)

**Problem**:
- Private benefit < Social benefit
- Market produces too little (underproduction)
- Price too high, quantity too low
- Deadweight loss

**Graphical representation**:
- Demand curve = Marginal private benefit (MPB)
- Social benefit curve = Marginal social benefit (MSB) above demand
- Market equilibrium: MPB = Supply
- Efficient equilibrium: MSB = Supply
- Deadweight loss triangle

**Key insight**: Positive externalities cause underproduction and inefficiency.

## Taxes for factoring in negative externalities

**Pigouvian tax**: Tax equal to external cost.

**Effect**:
- Shifts supply curve up by amount of tax
- Internalizes the externality
- Moves market toward efficient quantity
- Reduces deadweight loss

**Optimal tax**:
- Tax = External cost per unit
- Makes private cost = social cost
- Achieves efficient outcome

**Example**: Carbon tax on emissions
- Tax = cost of pollution
- Firms pay full social cost
- Reduces emissions to efficient level

**Key insight**: Taxes can correct negative externalities by making firms pay full social cost.

## Bonus articles: Pollution as a negative externality

### The economics of pollution

**Pollution as negative externality**:
- Firms don't pay full cost of pollution
- Overproduce polluting goods
- Society bears cost

**Efficient level of pollution**:
- Not zero (too costly to eliminate all)
- Where MSC = MSB
- Balance cost of pollution vs. cost of reducing it

### Command-and-control regulation

**Command-and-control**: Government sets rules and standards.

**Examples**:
- Emission limits
- Technology requirements
- Bans on certain activities

**Problems**:
- Inflexible
- Doesn't account for differences between firms
- May not be cost-effective

### What are market-oriented environmental tools?

**Market-oriented tools**: Use market incentives to reduce pollution.

**Advantages**:
- More flexible
- Cost-effective
- Encourages innovation

**Types**: Taxes, cap-and-trade, subsidies

### Types of market-oriented environmental tools

**1. Pigouvian taxes**:
- Tax on pollution
- Internalizes externality
- Example: Carbon tax

**2. Cap-and-trade**:
- Set total pollution limit
- Issue permits
- Firms trade permits
- Example: SO₂ trading

**3. Subsidies**:
- Pay firms to reduce pollution
- Example: Renewable energy subsidies

### The benefits and costs of US environmental laws

**Benefits**:
- Cleaner air and water
- Health improvements
- Ecosystem protection

**Costs**:
- Compliance costs
- Reduced economic output
- Job losses in some industries

**Key insight**: Environmental protection involves tradeoffs between benefits and costs.

### International environmental issues

**Global externalities**:
- Climate change
- Ocean pollution
- Ozone depletion

**Problems**:
- No global government
- Free-rider problem
- Difficult to coordinate

**Solutions**:
- International agreements (e.g., Paris Agreement)
- Carbon markets
- Technology transfer

### The tradeoff between economic output and environmental protection

**Tradeoff**:
- More environmental protection → Less economic output (in short run)
- Less protection → More output but more pollution

**Long run**:
- May be complementary (green growth)
- Innovation can reduce tradeoff

**Key insight**: There is often a tradeoff, but innovation can help reduce it.

## Bonus articles: Innovation as a positive externality

### Positive externalities of innovation

**Innovation benefits**:
- Creator benefits (private benefit)
- Others benefit (spillovers, knowledge)
- Society benefits (economic growth, better products)

**Problem**:
- Private benefit < Social benefit
- Underinvestment in innovation
- Too little R&D

### Investing in human capital

**Human capital**: Education, skills, knowledge.

**Positive externality**:
- Educated people benefit society
- Knowledge spillovers
- Economic growth

**Policy**: Public education, subsidies for education

### Why the private sector underinvests in innovation

**Reasons**:
1. **Spillovers**: Others benefit from your innovation
2. **Uncertainty**: High risk, uncertain returns
3. **Time**: Long payback period
4. **Public goods aspect**: Knowledge is non-rival

**Policy solutions**:
- Patents (temporary monopoly)
- R&D subsidies
- Public research funding
- Tax credits for R&D

**Key insight**: Innovation has positive externalities, leading to underinvestment. Government can help through patents, subsidies, and public funding.`,
        importantPoints: [
          'Negative externalities: overproduction, MSC > MPC',
          'Positive externalities: underproduction, MSB > MPB',
          'Pigouvian taxes can correct negative externalities',
          'Pollution is a negative externality requiring policy intervention',
          'Innovation is a positive externality requiring support',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-9-2',
    title: 'The four types of goods: private goods, public goods, common resources, and natural monopolies',
    duration: '40 min',
    contentItems: [
      {
        id: 'micro-u9-l2-video-1',
        type: 'video',
        title: 'The four types of goods: private goods, public goods, common resources, and natural monopolies',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'micro-u9-l2-article',
        type: 'article',
        title: 'Learn: The four types of goods: private goods, public goods, common resources, and natural monopolies',
        content: `# The four types of goods: private goods, public goods, common resources, and natural monopolies

## Tragedy of the commons

**Common resource**: Rival but non-excludable.

**Tragedy of the commons**: Overuse of common resources.

**Why it happens**:
- No one owns the resource
- Each user benefits from using it
- But cost is shared by all
- Incentive to overuse
- Resource depleted

**Examples**: Overfishing, deforestation, groundwater depletion, air pollution

**Solutions**:
- Private property rights
- Government regulation
- Quotas
- Taxes

**Key insight**: Common resources are overused because no one has incentive to conserve.

## Rival and excludable goods

**Rival**: One person's consumption prevents another's consumption.

**Non-rival**: One person's consumption doesn't prevent another's.

**Excludable**: Can prevent people from using the good.

**Non-excludable**: Cannot prevent people from using the good.

**Classification**:
- **Rival + Excludable**: Private goods
- **Rival + Non-excludable**: Common resources
- **Non-rival + Excludable**: Natural monopolies (club goods)
- **Non-rival + Non-excludable**: Public goods

**Key insight**: These characteristics determine the type of good and appropriate policy.

## What are public goods?

**Public goods**: Non-rival and non-excludable.

**Characteristics**:
- **Non-rival**: One person's use doesn't reduce availability to others
- **Non-excludable**: Can't prevent people from using it

**Examples**: National defense, streetlights, public parks, lighthouses, knowledge

**Problem**: Free-rider problem
- People can benefit without paying
- No incentive to pay
- Market underprovides (or doesn't provide)

**Solution**: Government provision (funded by taxes)

**Key insight**: Public goods are underprovided by markets due to free-rider problem.

## What is a free rider?

**Free rider**: Person who benefits from a good without paying for it.

**Why it's a problem**:
- If everyone free rides, good isn't provided
- Market fails
- Good not produced even though benefits > costs

**Examples**:
- Not paying for public radio but listening
- Not contributing to neighborhood watch but benefiting
- Not paying taxes but using public services

**Solution**: Government forces payment through taxes

**Key insight**: Free-rider problem prevents private provision of public goods.

## Public goods: real-world examples

**Pure public goods**:
- **National defense**: Protects all, can't exclude
- **Streetlights**: All benefit, can't exclude
- **Public knowledge**: Non-rival, hard to exclude

**Quasi-public goods** (some excludability possible):
- **Education**: Can exclude, but benefits spill over
- **Healthcare**: Can exclude, but public health benefits all
- **Parks**: Can exclude, but often provided publicly

**Key insight**: Many goods have public good characteristics, requiring government provision or regulation.`,
        importantPoints: [
          'Rival: one person\'s use prevents another\'s',
          'Excludable: can prevent use',
          'Public goods: non-rival and non-excludable',
          'Free-rider problem prevents private provision',
          'Common resources: rival but non-excludable (tragedy of commons)',
        ],
      } as ArticleContent,
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
      title: 'Basic economic concepts',
      description: 'Introduction to economics, scarcity, economic systems, and the circular flow model',
      lessons: unit1Lessons,
    },
    {
      id: 'unit-2',
      title: 'Supply, demand, and market equilibrium',
      description: 'Understanding demand, supply, market equilibrium, and how markets adjust to changes',
      lessons: unit2Lessons,
    },
    {
      id: 'unit-3',
      title: 'Elasticity',
      description: 'Understanding price elasticity of demand and supply, income elasticity, and cross-price elasticity',
      lessons: unit3Lessons,
    },
    {
      id: 'unit-4',
      title: 'Consumer and producer surplus, market interventions, and international trade',
      description: 'Understanding consumer and producer surplus, market interventions, deadweight loss, and international trade',
      lessons: unit4Lessons,
    },
    {
      id: 'unit-5',
      title: 'Consumer theory',
      description: 'Understanding utility, marginal utility, utility maximization, and consumer choice with indifference curves',
      lessons: unit5Lessons,
    },
    {
      id: 'unit-6',
      title: 'Production decisions and economic profit',
      description: 'Understanding production functions, costs, profit maximization, and firm entry/exit decisions',
      lessons: unit6Lessons,
    },
    {
      id: 'unit-7',
      title: 'Forms of competition',
      description: 'Understanding perfect competition, monopoly, monopolistic competition, oligopoly, and game theory',
      lessons: unit7Lessons,
    },
    {
      id: 'unit-8',
      title: 'Factor markets',
      description: 'Understanding factor markets, labor demand and supply, cost minimization, and monopsony',
      lessons: unit8Lessons,
    },
    {
      id: 'unit-9',
      title: 'Market failure and the role of government',
      description: 'Understanding externalities, public goods, common resources, and government intervention',
      lessons: unit9Lessons,
    },
  ],
  finalExamPassRate: 75,
  finalExam: [],
};

