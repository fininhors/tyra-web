#pragma once
#ifndef _PERSON_H_
#define _PERSON_H_

/*! Person class */

class Person{
	public:
		Person();
		Person(std::string, std::string, std::string);
		~Person();
		void setName(std::string);
		std::string getName();
		void setLastName(std::string);
		std::string getLastName();
		void setGender(std::string);
		std::string getGender();
	private:
		std::string name; /*!< Person's name. */
		std::string lastName; /*!< Person's lastname. */
		std::string gender; /*!< Person's gender. */
};

#endif
