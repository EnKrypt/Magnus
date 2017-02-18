# Magnus

## Fucking Done Lul 🌈

Magnus is a system that allows elevators to make priority based decisions intelligently on the fly.

A non-trivial number of deaths inside hospitals occur while the patient is waiting or being moved. Magnus lets patients and staff get from one floor to another within a hospital in as little time as possible.

## Principle

Magnus integrates with existing hospital systems to obtain relevant data and intelligently tag patients and doctors against an objective priority scale without human intervention. When it detects the movement of a patient according to schedule, the "to" and "from" floors are added to the priority queue and acted upon based on the priorities of the remaining events in the queue. Its real-time nature also allows it to recognize unexpected events and adapt accordingly.

## Application

* High risk patients are given higher priority for scheduled movement.

* Doctors assigned to high risk patients are given higher priority while responding to distress calls.

* Existing systems used to alert staff about emergencies are leveraged to dynamically adjust priority based on severity of the emergency and type of care required.

* When there are people in the elevator of the same priority, it takes the most optimal path to drop everyone off in the least amount of time.

* When Magnus detects that other people in the elevator can be a liability while responding to a higher priority event, it signals to them that they should exit the elevator.